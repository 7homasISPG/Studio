import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, Typography, Paper, Divider, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';

// Base node styling
const nodeStyles = {
  padding: '10px',
  borderRadius: '8px',
  minWidth: '200px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
};

// Agent Node Component
export const AgentNode = memo(({ data, selected, id }) => {
  const handleNodeClick = () => {
    if (data.onNodeClick) {
      data.onNodeClick(id);
    }
  };

  return (
    <Paper 
      sx={{
        ...nodeStyles,
        border: selected ? '2px solid #2196f3' : '1px solid #e0e0e0',
        backgroundColor: '#f5f9ff',
      }}
      onClick={handleNodeClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {data.label || 'Agent'}
        </Typography>
        <Box>
          <Tooltip title="Settings">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              if (data.onSettingsClick) data.onSettingsClick(id);
            }}>
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Info">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              if (data.onInfoClick) data.onInfoClick(id);
            }}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Divider />
      
      <Box sx={{ py: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {data.description || 'AI Agent that can perform tasks'}
        </Typography>
      </Box>
      
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#2196f3' }}
        id="agent-input"
      />
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#4caf50' }}
        id="agent-output"
      />
    </Paper>
  );
});

// Tool Node Component
export const ToolNode = memo(({ data, selected, id }) => {
  const handleNodeClick = () => {
    if (data.onNodeClick) {
      data.onNodeClick(id);
    }
  };

  return (
    <Paper 
      sx={{
        ...nodeStyles,
        border: selected ? '2px solid #2196f3' : '1px solid #e0e0e0',
        backgroundColor: '#f0f7f0',
      }}
      onClick={handleNodeClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {data.label || 'Tool'}
        </Typography>
        <Box>
          <Tooltip title="Settings">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              if (data.onSettingsClick) data.onSettingsClick(id);
            }}>
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Info">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              if (data.onInfoClick) data.onInfoClick(id);
            }}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Divider />
      
      <Box sx={{ py: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {data.description || 'Tool for performing specific actions'}
        </Typography>
      </Box>
      
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#2196f3' }}
        id="tool-input"
      />
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#4caf50' }}
        id="tool-output"
      />
    </Paper>
  );
});

// Supervisor Node Component
export const SupervisorNode = memo(({ data, selected, id }) => {
  const handleNodeClick = () => {
    if (data.onNodeClick) {
      data.onNodeClick(id);
    }
  };

  return (
    <Paper 
      sx={{
        ...nodeStyles,
        border: selected ? '2px solid #2196f3' : '1px solid #e0e0e0',
        backgroundColor: '#fff8f0',
      }}
      onClick={handleNodeClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {data.label || 'Supervisor'}
        </Typography>
        <Box>
          <Tooltip title="Settings">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              if (data.onSettingsClick) data.onSettingsClick(id);
            }}>
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Info">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              if (data.onInfoClick) data.onInfoClick(id);
            }}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Divider />
      
      <Box sx={{ py: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {data.description || 'Supervises and coordinates agents and tools'}
        </Typography>
      </Box>
      
      {/* Input handles */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#2196f3' }}
        id="supervisor-input"
      />
      
      {/* Output handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#4caf50' }}
        id="supervisor-output"
      />
    </Paper>
  );
});

// Export node types object for ReactFlow
export const nodeTypes = {
  agentNode: AgentNode,
  toolNode: ToolNode,
  supervisorNode: SupervisorNode
};

