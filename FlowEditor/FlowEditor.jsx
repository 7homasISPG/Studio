// src/pages/Studio/FlowEditor/FlowEditor.jsx
import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, Background, Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Play, Lock, LockOpen } from 'lucide-react';
import PaletteSidebar from './PaletteSidebar';
import PropertiesPanel from './PropertiesPanel';
import { nodeTypes } from './CustomNodes';

// Mock API
const studioApi = {
  saveFlow: async (data) => { console.log('API Call: saveFlow'); return { id: data.id || uuidv4() }; },
  handleApiError: (error) => error.message || 'An API error occurred'
};

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [flowName, setFlowName] = useState('Untitled Flow');
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const reactFlowWrapper = useRef(null);
  const { toast } = useToast();

  const onNodeClick = useCallback((event, node) => setSelectedNode(node), []);
  const onPaneClick = useCallback(() => setSelectedNode(null), []);
  const onNodeUpdate = useCallback((id, data) => setNodes((nds) => nds.map((node) => node.id === id ? { ...node, data } : node)), [setNodes]);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds)), [setEdges]);
  const onDragOver = useCallback((event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; }, []);
  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type || !reactFlowInstance) return;
    const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
    const newNode = {
      id: `${type}_${uuidv4().substring(0, 8)}`, type, position,
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)}`, onNodeClick },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [reactFlowInstance, onNodeClick]);

  const handleSave = async () => { /* ... same save logic ... */ };

  return (
    <div className="w-full h-full flex flex-col">
      <header className="flex items-center justify-between p-2 border-b bg-gray-50 flex-shrink-0">
        <h2 className="text-xl font-bold ml-2">{flowName}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSave} disabled={loading}><Save className="h-4 w-4 mr-2" />Save</Button>
          <Button disabled={loading}><Play className="h-4 w-4 mr-2" />Deploy</Button>
        </div>
      </header>
      <div className="flex-grow relative" ref={reactFlowWrapper}>
        <ReactFlowProvider>
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={isLocked ? () => {} : onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onInit={setReactFlowInstance} onDrop={onDrop} onDragOver={onDragOver} onNodeClick={onNodeClick} onPaneClick={onPaneClick} nodeTypes={nodeTypes} fitView>
            <Controls />
            <Background variant="dots" gap={12} size={1} />
            <Panel position="top-right">
              <Button variant="outline" size="icon" onClick={() => setIsLocked(!isLocked)}>
                {isLocked ? <Lock className="h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
              </Button>
            </Panel>
          </ReactFlow>
        </ReactFlowProvider>
        <PaletteSidebar />
        {selectedNode && <PropertiesPanel selectedNode={selectedNode} onNodeUpdate={onNodeUpdate} onClose={() => setSelectedNode(null)} />}
      </div>
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        {/* ... Dialog content from previous example ... */}
      </Dialog>
    </div>
  );
};

export default FlowEditor;
