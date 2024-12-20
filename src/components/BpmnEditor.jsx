import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as BpmnEditor from "@kogito-tooling/kie-editors-standalone/dist/bpmn";

const BpmnEditorComponent = ({ editorRef }) => {
  const editorContainerRef = useRef(null);

  useEffect(() => {
    const editor = BpmnEditor.open({
      container: editorContainerRef.current,
      initialContent: Promise.resolve(""),
      readOnly: false,
    });

    if (editorRef) {
      editorRef.current = editor;
    }

    return () => {
      editor.close();
    };
  }, [editorRef]);

  return (
    <div ref={editorContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

BpmnEditorComponent.propTypes = {
  editorRef: PropTypes.shape({
    current: PropTypes.object,
  }),
};

export default BpmnEditorComponent;
