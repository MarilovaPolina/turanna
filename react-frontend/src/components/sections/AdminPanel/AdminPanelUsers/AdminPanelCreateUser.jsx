import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, resetUserState } from "../../../../store/usersSlice";

function AdminPanelCreateUser() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.users);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [createdUserName, setCreatedUserName] = React.useState(''); 
  const [passwordError, setPasswordError] = React.useState('');

  React.useEffect(() => {
    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password.length<8){
      setPasswordError('Пароль должен содержать минимум 8 символов');
      return;
    }else if(formData.password !== formData.password_confirmation) {
      setPasswordError('Пароли не совпадают');
      return;
    }else if (!/\d/.test(formData.password) && !/[A-ZА-Я]/.test(formData.password)) {
      setPasswordError('Пароль должен содержать хотя бы одну цифру и заглавную букву');
      return;
    }if(!/[a-zа-я]/.test(formData.password)) {
      setPasswordError('Пароль должен содержать хотя бы одну строчную букву');
      return;
    }
    setPasswordError('');
    dispatch(createUser(formData));
  };

  React.useEffect(() => {
    if (success) {
      setCreatedUserName(formData.name);
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      });
    }
  }, [success]);

  return (
    <div className="admin_panel_content">
      <div className="creation_heading">
        <p className="small_title_text">
          Добавить пользователя
        </p>
        <p className="creation_heading_subtitle">
          Новый пользователь получит доступ к админ-панели TURANNA ON-LINE с возможностью 
          добавления, редактирования и удаления информации на сайте. Пожалуйста, введите 
          адрес электронной почты нового сотрудника и надежный пароль, по которым будет 
          производиться вход в систему. Не делитесь паролем с ненадежными лицами, чтобы 
          сохранить безопасность админ-панели и веб-сайта.
        </p>
      </div>

      <div className="form_container">
        
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label htmlFor="user_name">Имя</label>
            <input 
              type="text" 
              className="admin_input"
              placeholder="Только имя"
              name="user_name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form_group">
            <label htmlFor="email">Эл. почта</label>
            <input 
              type="email" 
              className="admin_input"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form_group">
            <label htmlFor="password">Пароль</label>
            <input 
              type="password" 
              className={`admin_input ${passwordError ? 'error_input' : ''}`}
              placeholder="Пароль"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form_group">
            <label htmlFor="password_repeat">Повторите пароль</label>
            <input 
              type="password" 
              className={`admin_input ${passwordError ? 'error_input' : ''}`}
              placeholder="Пароль еще раз"
              name="password_repeat"
              value={formData.password_confirmation}
              onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
              required
              disabled={loading}
            />
            {passwordError && <p className="error_msg">{passwordError}</p>}
          </div>
          
          <button 
            className="blue_btn" 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>

          <p className="message_info_block">
            {error && <div className="error_msg">{error}</div>}
            {success && (
            <div className="success_msg">
                <p>Пользователь успешно создан. Новый администратор {createdUserName} может войти в систему, 
                используя указанные email и пароль.</p>
            </div>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminPanelCreateUser;