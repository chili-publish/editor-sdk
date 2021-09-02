/* eslint-disable no-console */
import { Connection } from 'penpal';
import { ConfigType, Child } from '../types/CommonTypes';
import Connect from './interactions/connector';

export { default as Editor } from './components/editor/Editor';
export { default as Connect } from './interactions/connector';

let connection: Connection;

export class SDK {
    config: ConfigType;

    connection: Connection;

    constructor(config: ConfigType) {
        this.config = config;
        this.connection = connection;
        Connect(config.editorLink, { stateChanged: this.stateChanged }, this.setConnection);
    }

    setConnection = (newConnection: Connection) => {
        connection = newConnection;
    };

    removeLayout = async (layoutId: number) => {
        const res = (await connection.promise) as unknown as Child;
        await res.removeLayout(layoutId);
    };

    stateChanged = (document: Document) => {
        const callBack = this.config.stateChanged;
        callBack(document);
    };
}

export default SDK;
