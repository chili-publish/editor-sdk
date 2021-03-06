import { FrameController } from '../../controllers/FrameController';
import MockEditorAPI, { mockSelectFrame } from '../__mocks__/FrameProperties';

let mockedFrameProperties: FrameController;
let frameId: number;
beforeEach(() => {
    mockedFrameProperties = new FrameController(MockEditorAPI);
    jest.spyOn(mockedFrameProperties, 'getFrames');
    jest.spyOn(mockedFrameProperties, 'getSelectedFrames');
    jest.spyOn(mockedFrameProperties, 'getFramesByPageId');
    jest.spyOn(mockedFrameProperties, 'getFrameByName');
    jest.spyOn(mockedFrameProperties, 'getFrameById');
    jest.spyOn(mockedFrameProperties, 'getFramePropertiesOnSelectedLayout');
    jest.spyOn(mockedFrameProperties, 'getFramePropertiesByFrameId');
    jest.spyOn(mockedFrameProperties, 'getFramesProperties');

    jest.spyOn(mockedFrameProperties, 'setFrameHeight');
    jest.spyOn(mockedFrameProperties, 'setFrameWidth');

    jest.spyOn(mockedFrameProperties, 'setFrameX');

    jest.spyOn(mockedFrameProperties, 'setFrameY');

    jest.spyOn(mockedFrameProperties, 'setFrameRotation');

    jest.spyOn(mockedFrameProperties, 'setFrameVisibility');

    jest.spyOn(mockedFrameProperties, 'resetFrame');

    jest.spyOn(mockedFrameProperties, 'resetFrameX');
    jest.spyOn(mockedFrameProperties, 'resetFrameY');

    jest.spyOn(mockedFrameProperties, 'resetFrameHeight');

    jest.spyOn(mockedFrameProperties, 'resetFrameWidth');
    jest.spyOn(mockedFrameProperties, 'resetFrameRotation');

    jest.spyOn(mockedFrameProperties, 'resetFrameSize');
    jest.spyOn(mockedFrameProperties, 'selectFrame');
    jest.spyOn(mockedFrameProperties, 'selectMultipleFrames');

    jest.spyOn(mockedFrameProperties, 'setFrameName');

    frameId = mockSelectFrame.frameId;
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('FrameProperties', () => {
    it('Should call  all of the Frame Functions of EditorAPI successfully', () => {
        mockedFrameProperties.getFrames();
        expect(mockedFrameProperties.getFrames).toHaveBeenCalledTimes(1);

        mockedFrameProperties.getSelectedFrames();
        expect(mockedFrameProperties.getSelectedFrames).toHaveBeenCalledTimes(1);

        mockedFrameProperties.getFramesByPageId(2);
        expect(mockedFrameProperties.getFramesByPageId).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFramesByPageId).toHaveBeenCalledWith(2);

        mockedFrameProperties.getFrameByName('frame');
        expect(mockedFrameProperties.getFrameByName).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFrameByName).toHaveBeenCalledWith('frame');

        mockedFrameProperties.getFrameById(5);
        expect(mockedFrameProperties.getFrameById).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFrameById).toHaveBeenCalledWith(5);

        mockedFrameProperties.getFramePropertiesOnSelectedLayout();
        expect(mockedFrameProperties.getFramePropertiesOnSelectedLayout).toHaveBeenCalledTimes(1);

        mockedFrameProperties.getFramePropertiesByFrameId(1, 2);
        expect(mockedFrameProperties.getFramePropertiesByFrameId).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFramePropertiesByFrameId).toHaveBeenCalledWith(1, 2);

        mockedFrameProperties.getFramesProperties(1);
        expect(mockedFrameProperties.getFramesProperties).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFramesProperties).toHaveBeenCalledWith(1);

        mockedFrameProperties.setFrameHeight(frameId, '300');
        expect(mockedFrameProperties.setFrameHeight).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameRotation(frameId, '400');
        expect(mockedFrameProperties.setFrameRotation).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameY(frameId, '100');
        expect(mockedFrameProperties.setFrameY).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameX(frameId, '400');
        expect(mockedFrameProperties.setFrameX).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameWidth(frameId, '332');
        expect(mockedFrameProperties.setFrameWidth).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameHeight(frameId, '32');
        expect(mockedFrameProperties.setFrameHeight).toHaveBeenCalledTimes(2);

        mockedFrameProperties.setFrameName(1, 'TEST');
        expect(mockedFrameProperties.setFrameName).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameVisibility(2, false);
        expect(mockedFrameProperties.setFrameVisibility).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrame(2);
        expect(mockedFrameProperties.resetFrame).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameX(2);
        expect(mockedFrameProperties.resetFrameX).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameY(2);
        expect(mockedFrameProperties.resetFrameY).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameRotation(2);
        expect(mockedFrameProperties.resetFrameRotation).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameHeight(2);
        expect(mockedFrameProperties.resetFrameHeight).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameWidth(2);
        expect(mockedFrameProperties.resetFrameWidth).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameSize(2);
        expect(mockedFrameProperties.resetFrameSize).toHaveBeenCalledTimes(1);

        mockedFrameProperties.selectFrame(2);
        expect(mockedFrameProperties.selectFrame).toHaveBeenCalledTimes(1);

        mockedFrameProperties.selectMultipleFrames([5]);
        expect(mockedFrameProperties.selectMultipleFrames).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.selectMultipleFrames).toHaveBeenCalledWith([5]);
    });
});

describe('User inputs for Frame Properties', () => {
    it('Returns null when user input doesnt contain any number', async () => {
        const responseX = await mockedFrameProperties.setFrameX(frameId, 'dasdsa');
        const responseY = await mockedFrameProperties.setFrameY(frameId, 'sdsadas');
        const responseWidth = await mockedFrameProperties.setFrameWidth(frameId, 'sd');
        const responseHeight = await mockedFrameProperties.setFrameHeight(frameId, 'dds');
        const responseRotation = await mockedFrameProperties.setFrameRotation(frameId, 'dsdsd');
        expect(responseX).toEqual(null);
        expect(responseY).toEqual(null);
        expect(responseWidth).toEqual(null);
        expect(responseHeight).toEqual(null);
        expect(responseRotation).toEqual(null);
    });

    it('return null when the user input an infinite value', async () => {
        const responseRotation = await mockedFrameProperties.setFrameRotation(frameId, '20/0');
        expect(responseRotation).toBeNull();
    });
});
