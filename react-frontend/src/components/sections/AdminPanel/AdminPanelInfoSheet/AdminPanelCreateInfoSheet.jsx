import React, { use } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextEditor from '../../../common/TextEditor/TextEditor';
import { createInfoSheet } from '../../../../store/infoSheetSlice';

const INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [],
}

const AdminPanelCreateInfoSheet = () => {
    const [data, setData] = React.useState(INITIAL_DATA);
    const [title, setTitle] = React.useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.infoSheet);

    const handleSave = () => {
        dispatch(createInfoSheet({ title, content: data }));
        console.log(data);
    }

    return (
        <div>
            <h2>Создание справки</h2>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Введите заголовок"
            />
            <TextEditor data={data} onChange={setData} editorBlock="editorjs-container" />
            <button onClick={handleSave} disabled={loading}>Save Data</button>
            {error && <p className='error_msg'>{error}</p>}
        </div>
    )
}

export default AdminPanelCreateInfoSheet
