import React from 'react'
import TextEditor from '../../../common/TextEditor/TextEditor';

const INITIAL_DATA = {
    time: new Date().getTime(),
}

const AdminPanelCreateInfoSheet = () => {
    const [data, setData] = React.useState(INITIAL_DATA);
    return (
        <div>
            meow
            <TextEditor data={data} onChange={setData} editorBlock="editorjs-container" />
            <button onClick={() => console.log(data)}>Save Data</button>
        </div>
    )
}

export default AdminPanelCreateInfoSheet
