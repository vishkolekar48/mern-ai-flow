import { useState } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import AskToAIService from "../services/AskToAIService";
import AddPromptDataService from "../services/AddPromptDataService";

const nodeStyle = {
  width: 200,
  padding: 5,
  borderRadius: 10,
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  textAlign: "center"
};

const textareaStyle = {
  minHeight: 8,
  resize: "none",
  padding: 2,
  borderRadius: 6,
  border: "1px solid #d1d5db",
};

const resultStyle = {
  minHeight: 40,
  fontSize: 14,
  color: "#374151"
};

const topBarStyle = {
  position: "absolute",
  top: 10,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10,
  background: "#ffffff",
  padding: "10px 20px",
  borderRadius: 10,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  display: "flex",
  gap: 20,
  alignItems: "center"
};

const primaryBtn = {
  padding: "6px 14px",
  marginRight: 10,
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "6px 14px",
  background: "#10b981",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};

function Flow () {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const nodes = [
    {
      id: "1",
      position: { x: 300, y: 50 },
      data: {
        label: (
          <div style={nodeStyle}>
            <h4>Input</h4>
            <textarea
              placeholder="Type your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={textareaStyle}
            />
          </div>
        )
      }
    },
    {
      id: "2",
      position: { x: 300, y: 190 },
      data: {
        label: (
          <div style={nodeStyle}>
            <h4>Result</h4>
            <div style={resultStyle}>
              {loading ? "Loading..." : result || "AI response will appear here"}
            </div>
          </div>
        )
      }
    }
  ];

  const edges = [
    { id: "e1-2", source: "1", target: "2", animated: true }
  ];

  const runFlow = async () => {
    if (!prompt) return alert("Please enter a prompt");
    setLoading(true);
    const res = await AskToAIService(prompt);
    setResult(res.answer);
    setLoading(false);
  };

  const saveToDB = async () => {
    if (!result) return alert("Nothing to save");
    const res = await AddPromptDataService(prompt, result);
    alert("Saved to MongoDB");
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={topBarStyle}>
        <h2>AI Prompt Flow</h2>
        <div>
          <button onClick={runFlow} style={primaryBtn}>Run Flow</button>
          <button onClick={saveToDB} style={secondaryBtn}>Save</button>
        </div>
      </div>

  <ReactFlow nodes={nodes} edges={edges} fitView>
    <Background />
    <Controls />
  </ReactFlow>

    </div>
  );
}

export default Flow ;
