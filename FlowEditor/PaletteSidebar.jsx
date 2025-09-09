// src/components/studio/FlowEditor/PaletteSidebar.jsx

import React from 'react';
import { Bot, Zap, Brain } from 'lucide-react';

// This is a reusable component for each draggable node in the palette.
const DraggableNode = ({ type, label, icon: Icon, description }) => {
  /**
   * When a drag starts, we store the node's `type` in the event's dataTransfer object.
   * The React Flow canvas will read this data on drop.
   */
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="p-3 mb-2 border-2 border-dashed rounded-lg cursor-grab bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-colors duration-200"
      onDragStart={(event) => onDragStart(event, type)}
      draggable // This HTML attribute makes the element draggable
    >
      <div className="flex items-center">
        <Icon className="h-6 w-6 mr-3 text-gray-500 flex-shrink-0" />
        <div>
          <span className="font-semibold text-sm text-gray-800">{label}</span>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

// This is the main sidebar component that contains the draggable nodes.
const PaletteSidebar = () => {
  return (
    <aside className="absolute top-4 left-4 z-10 w-72 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-900">Components</h3>
      <div className="space-y-2">
        <DraggableNode 
          type="supervisor" 
          label="Supervisor" 
          icon={Brain} 
          description="The main coordinator of the agent team."
        />
        <DraggableNode 
          type="agent" 
          label="Assistant Agent" 
          icon={Bot} 
          description="A specialized agent that can perform tasks."
        />
        <DraggableNode 
          type="tool" 
          label="API Tool" 
          icon={Zap} 
          description="A function that connects to an external API."
        />
      </div>
    </aside>
  );
};

export default PaletteSidebar;
