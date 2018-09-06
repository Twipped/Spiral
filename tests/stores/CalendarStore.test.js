
import MockAsyncStorage from 'mock-async-storage';
import CalendarStore from '../../stores/CalendarStore';

const mockStorage = new MockAsyncStorage();

it('stores a month when we write a day the first time', async () => {
	CalendarStore.setDayState(2018, 7, 5, { foo: 16 });
	await CalendarStore._pending;

	const dayState = await mockStorage.getItem('@CalendarStore:2018-7');
	expect(dayState).toMatchObject({
		5: {
			foo: 16,
		},
	});
});

beforeAll(() => {
	jest.mock('AsyncStorage', () => mockStorage);
});

afterAll(() => {
	jest.unmock('AsyncStorage');
});

beforeEach(() => {
	mockStorage.clear();
});
