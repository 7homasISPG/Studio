// src/pages/Studio/StudioPage.jsx
import React, { useState } from 'react';
import MainSidebar from './MainSidebar';
import FlowEditor from './FlowEditor/FlowEditor';
import FlowsDashboard from './FlowsDashboard'; 
import KnowledgeBaseStep from '../AgenticWorkspace/KnowledgeBaseStep';
import PlaceholderView from '@/components/common/PlaceholderView';
import TopBar from '@/components/TopBar';
import { useAuth } from '@/contexts/AuthContext';
import ApiKeysView from './ApiKeysView';

const StudioPage = () => {
    const [currentView, setCurrentView] = useState('Agentflow'); 
    const [viewParams, setViewParams] = useState({});
    const { isAuthenticated } = useAuth();

    const handleViewChange = (view, params = {}) => {
        setCurrentView(view);
        setViewParams(params);
    };

    const renderView = () => {
        switch (currentView) {
            // ✅ Dashboard for Chatflow
            case 'Chatflow': 
                return (
                    <FlowsDashboard 
                        type="chatflows"
                        title="Chatflow"
                        description="Build and manage your single-agent systems and RAG bots."
                        onViewChange={handleViewChange}
                        createView="ChatflowEditor"
                    />
                );

            // ✅ Dashboard for Agentflow
            case 'Agentflow': 
                return (
                    <FlowsDashboard
                        type="agents"
                        title="Agentflow"
                        description="Create and manage intelligent multi-step agent workflows."
                        onViewChange={handleViewChange}
                        createView="AgentflowEditor"
                    />
                );

            // ✅ Knowledge Base / Document Store
            case 'DocumentStore':
                return (
                    <div className="p-6 overflow-y-auto h-full">
                        <KnowledgeBaseStep
                            initialData={viewParams.initialData || {}}
                            onNext={(data) => console.log('Proceed with sources:', data)}
                            onBack={() => handleViewChange('Agentflow')}
                        />
                    </div>
                );

            // ✅ Flow editor (for both chatflow + agentflow)
            case 'ChatflowEditor':
            case 'AgentflowEditor':
                return <FlowEditor flowId={viewParams.flowId} />;

            case 'APIKeys': return <ApiKeysView />; // <<< Render the new view

            // ✅ Fallback
            default: 
                return <PlaceholderView title={currentView} />;
        }
    };

    return (
        <div className="flex h-screen flex-col bg-white">
            <TopBar isAuthenticated={isAuthenticated} />
            <div className="flex flex-1 pt-16 overflow-hidden">
                <MainSidebar activeView={currentView} onSelectView={handleViewChange} />
                <main className="flex-grow h-full overflow-hidden">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default StudioPage;

