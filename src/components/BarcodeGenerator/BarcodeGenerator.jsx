import React, { useEffect, useRef, useState } from 'react';
import bwipjs from 'bwip-js';
import { BarcodeGeneratorStyles } from './barcodegeneratorstyle';

const BarcodeGenerator = ({ sku, barcodeText, product }) => {
    const styles = new BarcodeGeneratorStyles();
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
        return <div style={styles.errorText}>Invalid Barcode Data</div>;
    }

    return (
        <>
            <div
                style={styles.inlineWrapper}
                onClick={() => setIsExpanded(true)}
                title="Click to enlarge for scanning"
            >
                {/* Fixed height of 40px matches the old 20px bars + 20px text */}
                <canvas ref={canvasRef} style={styles.inlineCanvas} />
            </div>

            {isExpanded && (
                <div
                    style={styles.modalOverlay}
                    onClick={() => setIsExpanded(false)}
                >
                    <div
                        style={styles.modalContent}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the white modal itself
                    >
                        {product ? (
                            <div style={styles.productDetails}>
                                <h2 style={styles.productName}>{product.ProductName}</h2>
                                <p style={styles.productInfo}><strong>SKU:</strong> {product.ProductSKU}</p>
                                <p style={styles.productInfo}><strong>Category:</strong> {product.ProductCategory}</p>
                                {product.ProductPrice && <p style={styles.priceText}><strong>Price:</strong> ${(Number(product.ProductPrice) || 0).toLocaleString('en-US')}</p>}
                                <hr style={styles.divider} />
                            </div>
                        ) : (
                            <h3 style={styles.scanHeader}>Scan Barcode</h3>
                        )}

                        <div style={styles.canvasContainer}>
                            <canvas ref={expandedCanvasRef} />
                        </div>
                        <button
                            style={styles.closeButton}
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
