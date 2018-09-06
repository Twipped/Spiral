
import MockAsyncStorage from 'mock-async-storage';
import CalendarStore from '../../stores/CalendarStore';
import { isObservableObject, toJS } from 'mobx';

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

it('updates a month when we write a day that does not exist, when another day does', async () => {
	await mockStorage.setItem('@CalendarStore:2018-7', { 28: { foo: 16, baz: 100 } });

	await CalendarStore.ensureMonth(2018, 7);
	CalendarStore.setDayState(2018, 7, 5, { foo: 20, bar: 8 });
	await CalendarStore._pending;

	const dayState = await mockStorage.getItem('@CalendarStore:2018-7');
	expect(dayState).toMatchObject({
		5: {
			foo: 20,
			bar: 8,
		},
		28: {
			foo: 16,
			baz: 100,
		},
	});
});

it('updates a month when we write a day that already exists', async () => {
	await mockStorage.setItem('@CalendarStore:2018-7', { 5: { foo: 16, baz: 100 } });

	await CalendarStore.ensureMonth(2018, 7);
	CalendarStore.setDayState(2018, 7, 5, { foo: 20, bar: 8 });
	await CalendarStore._pending;

	const dayState = await mockStorage.getItem('@CalendarStore:2018-7');
	expect(dayState).toMatchObject({
		5: {
			foo: 20,
			baz: 100,
			bar: 8,
		},
	});
});

it('retrieves a day when it exists', async () => {
	await mockStorage.setItem('@CalendarStore:2018-7', { 5: { foo: 16, baz: 100 } });

	await CalendarStore.ensureMonth(2018, 7);
	const dayState = CalendarStore.getDayState(2018, 7, 5);

	expect(isObservableObject(dayState)).toBe(true);
	expect(toJS(dayState)).toMatchObject({
		foo: 16,
		baz: 100,
	});
});

beforeAll(() => {
	jest.mock('AsyncStorage', () => mockStorage);
});

afterAll(() => {
	jest.unmock('AsyncStorage');
});

beforeEach(async () => {
	await mockStorage.clear();
	await CalendarStore.clear();
});
