import React, { useState } from 'react';
import { LoginStyles } from './loginstyle';
import loginImage from '../assets/blueTruck.webp';
import logoImage from '../assets/fastcarlogo.webp';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
    const styles = new LoginStyles();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);
        // Add login logic here
    };

    return (
        <div style={styles.container}>
            <div style={styles.imageSection}>
                <img src={loginImage} alt="Login Illustration" style={styles.image} />
            </div>

            <div style={styles.formSection}>
                <img src={logoImage} alt="Login Illustration" style={styles.logoimage} />
                <h2 style={styles.title}>Enterprise Resource Planning (ERP) system </h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <LockOutlinedIcon style={styles.lockIcon} />
                    <h1 style={styles.titlelogin}>Login</h1>

                    <div style={styles.inputGroup}>
                        <label htmlFor="username" style={styles.label}>Username </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            style={styles.input}
                            required

                        />

                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            style={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" style={styles.button}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
