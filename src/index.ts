import { Connection } from 'penpal';
import Connect from './interactions/connector';
import { FrameController } from './controllers/FrameController';
import { AnimationController } from './controllers/AnimationController';
import { LayoutController } from './controllers/LayoutController';
import { PageController } from './controllers/PageController';
import { UtilsController } from './controllers/UtilsController';
import { SubscriberController } from './controllers/SubscriberController';
import { DocumentController } from './controllers/DocumentController';
import { DebugController } from './controllers/DebugController';

import type { ConfigType, EditorAPI } from '../types/CommonTypes';
import { VariableController } from './controllers/VariableController';
import { ToolController } from './controllers/ToolController';
import { UndoManagerController } from './controllers/UndoManagerController';

export { FrameProperyNames, LayoutProperyNames, ToolType, DownloadFormats } from './utils/enums';

export {
    SlideDirections,
    ShakeDirections,
    EaseTypes,
    TweenTypes,
    BasicAnimationsEmphasisStyles,
} from '../types/AnimationTypes';
export { LayoutType } from '../types/LayoutTypes';
export { BlendMode, FrameTypeEnum, VerticalAlign, TextDirection, FlowDirection } from '../types/FrameTypes';
export { VariableType } from '../types/VariableTypes';

export type { LayoutPropertiesType, FrameProperties, LayoutWithFrameProperties } from '../types/LayoutTypes';
export type { FrameLayoutType, FrameType, Frame, TextFrame, ImageFrame } from '../types/FrameTypes';
export type { Variable, VariableMoves } from '../types/VariableTypes';

export type { DocumentError } from '../types/DocumentTypes';
export type {
    FrameAnimationType,
    FrameAnimationPropertiesType,
    EaseTweenCombinationType,
    AnimationPlaybackType,
    BasicAnimationsType,
} from '../types/AnimationTypes';
export type { ConfigType, InitialStateType, PageType, EditorResponse, SelectedLayoutFrame } from '../types/CommonTypes';

let connection: Connection;

export class SDK {
    config: ConfigType;
    connection: Connection;

    /**
     * @ignore
     */
    editorAPI: EditorAPI;

    layout: LayoutController;
    frame: FrameController;
    animation: AnimationController;
    document: DocumentController;
    variable: VariableController;
    utils: UtilsController;
    tool: ToolController;
    page: PageController;
    debug: DebugController;
    undoManager: UndoManagerController;

    private subscriber: SubscriberController;

    /**
     * The SDK should be configured clientside and it exposes all controllers to work with in other applications
     * @param config The configuration object where the SDK and editor can get configured
     */
    constructor(config: ConfigType) {
        this.config = config;
        this.connection = connection;
        this.editorAPI = connection?.promise.then((child) => {
            return child;
        }) as unknown as EditorAPI;

        this.layout = new LayoutController(this.editorAPI);
        this.frame = new FrameController(this.editorAPI);
        this.animation = new AnimationController(this.editorAPI);
        this.document = new DocumentController(this.editorAPI);
        this.variable = new VariableController(this.editorAPI);
        this.utils = new UtilsController();
        this.subscriber = new SubscriberController(this.config);
        this.tool = new ToolController(this.editorAPI);
        this.page = new PageController(this.editorAPI);
        this.debug = new DebugController(this.editorAPI);
        this.undoManager = new UndoManagerController(this.editorAPI);
    }

    /**
     * This method will initiate the editor, running this will result in the editor restarting
     * It will generate an iframe in the document
     */
    loadEditor = () => {
        Connect(
            this.config.editorLink,
            {
                onStateChanged: this.subscriber.onStateChanged,
                onSelectedFrameContentChanged: this.subscriber.onSelectedFrameContentChanged,
                onSelectedFrameLayoutChanged: this.subscriber.onSelectedFrameLayoutChanged,
                onSelectedLayoutPropertiesChanged: this.subscriber.onSelectedLayoutPropertiesChanged,
                onOpenLayoutPropertiesPanelChange: this.subscriber.onPageSelectionChanged,
                onScrubberPositionChanged: this.subscriber.onAnimationPlaybackChanged,
                onFrameAnimationsChanged: this.subscriber.onAnimationChanged,
                onVariableListChanged: this.subscriber.onVariableListChanged,
                onSelectedToolChanged: this.subscriber.onSelectedToolChanged,
                onUndoStateChanged: this.subscriber.onUndoStateChanged,
                onSelectedLayoutFramesChanged: this.subscriber.onSelectedLayoutFramesChanged,
            },
            this.setConnection,
            this.config.editorId,
        );
        this.editorAPI = connection?.promise.then((editorAPI) => {
            return editorAPI;
        }) as unknown as EditorAPI;

        this.layout = new LayoutController(this.editorAPI);
        this.frame = new FrameController(this.editorAPI);
        this.animation = new AnimationController(this.editorAPI);
        this.document = new DocumentController(this.editorAPI);
        this.variable = new VariableController(this.editorAPI);
        this.utils = new UtilsController();
        this.tool = new ToolController(this.editorAPI);
        this.page = new PageController(this.editorAPI);
        this.debug = new DebugController(this.editorAPI);
        this.undoManager = new UndoManagerController(this.editorAPI);
    };

    setConnection = (newConnection: Connection) => {
        connection = newConnection;
    };
}

export default SDK;
