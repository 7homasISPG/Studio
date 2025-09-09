import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Switch, 
  FormControlLabel,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const PropertiesPanel = ({ selectedNode, onNodeUpdate, onClose }) => {
  const [nodeData, setNodeData] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    advanced: false,
    connections: false
  });

  // Initialize node data when selected node changes
  useEffect(() => {
    if (selectedNode) {
      setNodeData({...selectedNode.data});
    } else {
      setNodeData(null);
    }
  }, [selectedNode]);

  if (!selectedNode || !nodeData) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          width: 300, 
          height: '100%', 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Select a node to edit its properties
        </Typography>
      </Paper>
    );
  }

  // Handle property changes
  const handlePropertyChange = (property, value) => {
    setNodeData({
      ...nodeData,
      [property]: value
    });
  };

  // Apply changes to the node
  const handleApplyChanges = () => {
    if (onNodeUpdate) {
      onNodeUpdate(selectedNode.id, nodeData);
    }
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Render different form fields based on node type
  const renderNodeSpecificFields = () => {
    switch (nodeData.type) {
      case 'agentNode':
        return (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel id="agent-model-label">Model</InputLabel>
              <Select
                labelId="agent-model-label"
                value={nodeData.model || ''}
                label="Model"
                onChange={(e) => handlePropertyChange('model', e.target.value)}
              >
                <MenuItem value="gpt-4">GPT-4</MenuItem>
                <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                <MenuItem value="claude-3-opus">Claude 3 Opus</MenuItem>
                <MenuItem value="claude-3-sonnet">Claude 3 Sonnet</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="System Prompt"
              multiline
              rows={4}
              value={nodeData.systemPrompt || ''}
              onChange={(e) => handlePropertyChange('systemPrompt', e.target.value)}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={nodeData.streaming || false}
                  onChange={(e) => handlePropertyChange('streaming', e.target.checked)}
                />
              }
              label="Enable Streaming"
            />
          </>
        );
      
      case 'toolNode':
        return (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel id="tool-type-label">Tool Type</InputLabel>
              <Select
                labelId="tool-type-label"
                value={nodeData.toolType || ''}
                label="Tool Type"
                onChange={(e) => handlePropertyChange('toolType', e.target.value)}
              >
                <MenuItem value="web-search">Web Search</MenuItem>
                <MenuItem value="code-interpreter">Code Interpreter</MenuItem>
                <MenuItem value="file-reader">File Reader</MenuItem>
                <MenuItem value="api-call">API Call</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="API Endpoint"
              value={nodeData.apiEndpoint || ''}
              onChange={(e) => handlePropertyChange('apiEndpoint', e.target.value)}
              disabled={nodeData.toolType !== 'api-call'}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Parameters"
              multiline
              rows={3}
              value={nodeData.parameters || ''}
              onChange={(e) => handlePropertyChange('parameters', e.target.value)}
            />
          </>
        );
      
      case 'supervisorNode':
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Coordination Strategy"
              value={nodeData.strategy || ''}
              onChange={(e) => handlePropertyChange('strategy', e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="supervisor-model-label">Model</InputLabel>
              <Select
                labelId="supervisor-model-label"
                value={nodeData.model || ''}
                label="Model"
                onChange={(e) => handlePropertyChange('model', e.target.value)}
              >
                <MenuItem value="gpt-4">GPT-4</MenuItem>
                <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                <MenuItem value="claude-3-opus">Claude 3 Opus</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Max Iterations"
              type="number"
              value={nodeData.maxIterations || 10}
              onChange={(e) => handlePropertyChange('maxIterations', parseInt(e.target.value))}
            />
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        width: 300, 
        height: '100%', 
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Typography variant="h6" fontWeight="bold">
          Properties
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ p: 2, flexGrow: 1 }}>
        {/* Basic Properties Section */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              mb: 1
            }}
            onClick={() => toggleSection('basic')}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Basic Properties
            </Typography>
            {expandedSections.basic ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
          
          <Collapse in={expandedSections.basic}>
            <TextField
              fullWidth
              margin="normal"
              label="Label"
              value={nodeData.label || ''}
              onChange={(e) => handlePropertyChange('label', e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              multiline
              rows={2}
              value={nodeData.description || ''}
              onChange={(e) => handlePropertyChange('description', e.target.value)}
            />
            
            {/* Node-specific fields */}
            {renderNodeSpecificFields()}
          </Collapse>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Advanced Properties Section */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              mb: 1
            }}
            onClick={() => toggleSection('advanced')}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Advanced Properties
            </Typography>
            {expandedSections.advanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
          
          <Collapse in={expandedSections.advanced}>
            <TextField
              fullWidth
              margin="normal"
              label="Node ID"
              value={selectedNode.id || ''}
              disabled
            />
            <FormControlLabel
              control={
                <Switch
                  checked={nodeData.isRequired || false}
                  onChange={(e) => handlePropertyChange('isRequired', e.target.checked)}
                />
              }
              label="Required Node"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Custom Data"
              multiline
              rows={3}
              value={nodeData.customData || ''}
              onChange={(e) => handlePropertyChange('customData', e.target.value)}
            />
          </Collapse>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Connections Section */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              mb: 1
            }}
            onClick={() => toggleSection('connections')}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Connections
            </Typography>
            {expandedSections.connections ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
          
          <Collapse in={expandedSections.connections}>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="Input Connections" 
                  secondary={selectedNode.data.inputConnections?.length || 0}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Output Connections" 
                  secondary={selectedNode.data.outputConnections?.length || 0}
                />
              </ListItem>
            </List>
          </Collapse>
        </Box>
      </Box>
      
      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleApplyChanges}
        >
          Apply Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default PropertiesPanel;

