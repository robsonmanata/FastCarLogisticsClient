import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../actions/user';
import { LoginStyles } from './loginstyle';
import loginImage from '../assets/blueTruck.webp';
import logoImage from '../assets/fastcarlogo.webp';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import imageCompression from 'browser-image-compression';

const Login = () => {
    const styles = new LoginStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        repeatPassword: '',
        profilePicture: '',
        accessPass: '',
        username: '' // Keep username for login compatibility if needed, or map email to it
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'email' ? { username: value } : {})
        }));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const options = {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };

            try {
                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData(prev => ({
                        ...prev,
                        profilePicture: reader.result
                    }));
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            if (formData.password !== formData.repeatPassword) {
                alert("Passwords do not match!");
                return;
            }
            // Map form data to expected backend fields
            const signupData = {
                ...formData,
                firstName: formData.name,
                lastName: formData.surname,
                confirmPassword: formData.repeatPassword,
                role: 'user' // Default role, can be adjusted
            };
            dispatch(signup(signupData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.imageSection}>
                <img src={loginImage} alt="Login Illustration" style={styles.image} />
            </div>

            <div style={styles.formSection}>
                <div style={styles.formCard}>
                    <img src={logoImage} alt="Logo" style={styles.logoimage} />
                    <div style={styles.lockIconContainer}>
                        <LockOutlinedIcon style={styles.lockIcon} />
                    </div>
                    <h1 style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign in'}</h1>

                    <form style={styles.form} onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div style={styles.inputRow}>
                                <div style={styles.inputGroup}>
                                    <input name="name" placeholder="Name *" style={styles.input} onChange={handleChange} required />
                                </div>
                                <div style={styles.inputGroup}>
                                    <input name="surname" placeholder="Surname *" style={styles.input} onChange={handleChange} required />
                                </div>
                            </div>
                        )}

                        <div style={styles.inputGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address *"
                                style={styles.input}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isSignUp ? (
                            <div style={styles.inputRow}>
                                <div style={styles.inputGroup}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password *"
                                        style={styles.input}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <input type="password" name="repeatPassword" placeholder="Repeat Password *" style={styles.input} onChange={handleChange} required />
                                </div>
                            </div>
                        ) : (
                            <div style={styles.inputGroup}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password *"
                                    style={styles.input}
                                    onChange={handleChange}
                                    required
                                />
                                <div style={styles.passwordToggle} onClick={handleClickShowPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </div>
                            </div>
                        )}

                        {isSignUp && (
                            <>
                                <div style={styles.inputGroup}>

                                    <label style={styles.fileInputLabel}>
                                        {formData.profilePicture ? 'Profile Picture Added' : 'Add Profile Picture'}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={styles.fileInput}
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                                <div style={styles.inputGroup}>
                                    <input type="text" name="accessPass" placeholder="Access Pass *" style={styles.input} onChange={handleChange} required />
                                </div>
                            </>
                        )}

                        <button type="submit" style={styles.signInButton}>
                            {isSignUp ? 'SIGN UP' : 'SIGN IN'}
                        </button>

                        <div style={styles.signUpLink} onClick={switchMode}>
                            {isSignUp ? 'ALREADY HAVE AN ACCOUNT? SIGN IN' : "DON'T HAVE AN ACCOUNT? SIGN UP"}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
