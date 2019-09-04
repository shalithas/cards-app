import {mergeColumns} from './column-model';

it("Fetching cards returns a list of cards", async () => {
    const arr1 = [
        { id: 1, title: 'Test' },
        { id: 2, title: 'Test2' },
        { id: 3, title: 'Test3' },
    ];
    const arr2 = [
        { id: 4, title: 'Test4' },
        { id: 5, title: 'Test5' },
        { id: 3, title: 'Test3' },
    ];

    const res = [
        { id: 1, title: 'Test' },
        { id: 2, title: 'Test2' },
        { id: 3, title: 'Test3' },
        { id: 4, title: 'Test4' },
        { id: 5, title: 'Test5' },
    ];
    expect(mergeColumns(arr1, arr2)).toStrictEqual(res);
});