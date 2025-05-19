import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';

function Auth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser(formData)).unwrap();
            navigate('/dashboard/applications');
        } catch (error) {
            console.error('Пользователь не найден', error);
        }
    };

    return (
                <div className="wrapper auth_wrapper">
                    <div className="login_block">
                        <p className="small_title_text">Вход</p>

                        <form className="login_form" onSubmit={handleSubmit}>
                            <div className="inputs">
                                <div className="form_group">
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        id="email"
                                        name="email"
                                        placeholder="E-mail"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="form_group">
                                    <label htmlFor="password">Пароль</label>
                                    <input
                                        id="password"
                                        name="password"
                                        placeholder="Пароль"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                {/*
                                    <a href="#" className="recover_pass_link">Забыли пароль?</a>
                                    */}
                            </div>

                            <button type="submit" className="blue_btn">Войти</button>
                        </form>

                        {error && <div className="error_msg">{error}</div>}
                    </div>
                </div>


    );
}

export default Auth;
