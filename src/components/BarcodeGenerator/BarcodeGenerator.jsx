import React, { useEffect, useRef, useState } from 'react';
import bwipjs from 'bwip-js';

const BarcodeGenerator = ({ sku, barcodeText, product }) => {
    const canvasRef = useRef(null);
    const expandedCanvasRef = useRef(null);
    const [error, setError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (!sku) return;

        try {
            // Tiny inline version
            if (canvasRef.current) {
                bwipjs.toCanvas(canvasRef.current, {
                    bcid: 'code128',
                    text: barcodeText || sku,
                    scale: 2, // Generate high-resolution
                    height: 10,
                    includetext: true,
                    textxalign: 'center',
                    textsize: 20, // Reduce font size for the inline version
                    alttext: barcodeText ? barcodeText : sku,
                });
            }

            // Expanded modal version
            if (isExpanded && expandedCanvasRef.current) {
                bwipjs.toCanvas(expandedCanvasRef.current, {
                    bcid: 'code128',
                    text: barcodeText || sku,
                    scale: 3, // Large for easy scanning
                    height: 15,
                    includetext: true,
                    textxalign: 'center',
                    alttext: barcodeText ? barcodeText : sku,
                });
            }
            setError(false);
        } catch (e) {
            console.error('Barcode generation error:', e);
            setError(true);
        }
    }, [sku, barcodeText, isExpanded]);

    if (error) {
        return <div style={{ color: 'red', fontSize: '12px' }}>Invalid Barcode Data</div>;
    }

    return (
        <>
            <div
                style={{ display: 'flex', justifyContent: 'center', width: '100%', cursor: 'pointer' }}
                onClick={() => setIsExpanded(true)}
                title="Click to enlarge for scanning"
            >
                {/* Fixed height of 40px matches the old 20px bars + 20px text */}
                <canvas ref={canvasRef} style={{ height: '40px', maxWidth: '100px', objectFit: 'contain' }} />
            </div>

            {isExpanded && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        cursor: 'pointer'
                    }}
                    onClick={() => setIsExpanded(false)}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem',
                            minWidth: '400px'
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the white modal itself
                    >
                        {product ? (
                            <div style={{ textAlign: 'center', width: '100%' }}>
                                <h2 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>{product.ProductName}</h2>
                                <p style={{ margin: '0 0 0.25rem 0', color: '#4b5563', fontSize: '0.9rem' }}><strong>SKU:</strong> {product.ProductSKU}</p>
                                <p style={{ margin: '0 0 0.25rem 0', color: '#4b5563', fontSize: '0.9rem' }}><strong>Category:</strong> {product.ProductCategory}</p>
                                {product.ProductPrice && <p style={{ margin: '0', color: '#4b5563', fontSize: '0.9rem' }}><strong>Price:</strong> ${(Number(product.ProductPrice) || 0).toLocaleString('en-US')}</p>}
                                <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1rem 0' }} />
                            </div>
                        ) : (
                            <h3 style={{ margin: 0, color: '#374151' }}>Scan Barcode</h3>
                        )}

                        <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <canvas ref={expandedCanvasRef} />
                        </div>
                        <button
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1.5rem',
                                backgroundColor: '#374151',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                            onClick={() => setIsExpanded(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default BarcodeGenerator;
