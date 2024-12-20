import { useRef } from 'react';
import './App.css';
import BpmnEditorComponent from './components/BpmnEditor';

function App() {
  const bpmnEditorRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        bpmnEditorRef.current?.setContent('uploaded.bpmn', content);
      };
      reader.readAsText(file);
    }
  };

  const handleExport = async () => {
    if (bpmnEditorRef.current) {
      const content = await bpmnEditorRef.current.getContent();
      const blob = new Blob([content], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'diagram.bpmn';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="app-container">
      <h1>Kogito BPMN Editor</h1>
      <input type="file" accept=".bpmn, .xml" onChange={handleFileUpload} />
      <button onClick={handleExport} style={{ marginTop: '10px' }}>
        Export Diagram
      </button>
      <div className="editor-container">
        <BpmnEditorComponent editorRef={bpmnEditorRef} />
      </div>
    </div>
  );
}

export default App;
