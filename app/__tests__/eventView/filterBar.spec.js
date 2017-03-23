/**
 * Created by AAB3605 on 15/03/2017.
 */
import testUtil from '../testUtil';
import testComponents from '../testComponents';

describe('FilterBar', () => {

    it('should display four filters: important, informative, entertaining, participation', () => {
        const filters = [
            { name: 'participating'},
            { name: 'important'},
            { name: 'informative'},
            { name: 'entertaining'},
        ];
        const filterBar = testComponents.get('FilterBar', {
            filters
        });
        testUtil.checkChildComponentExists(filterBar, 'Filter', 4)
    });

    it('should merge the data returned by the different filters', () => {
        const filters = [
            {
                name: 'a',
                retain: {
                    property: 'a',
                    value: 'a'
                },
                intersect: true
            },
            {
                name: 'b',
                retain: {
                    property: 'b',
                    value: 'b'
                }
            }
        ];
        const dataToFilter = [
            { a:'a', b:'a', c:'a' },
            { a:'a', b:'b', c:'b' },
            { a:'b', b:'b', c:'b' },
        ];
        const expectedMergedData = [
            { a:'a', b:'a', c:'a' },
            { a:'a', b:'b', c:'b' },
        ];
        let mergedData = ['test'];
        let onFilter = result => {
            mergedData = result;
        }
        const filterBar = testComponents.get('FilterBar', {
            dataSource: dataToFilter,
            filters,
            onFilter
        });
        const filterComponents = testComponents.getChildren(filterBar, 'Filter');
        filterComponents.forEach(filter => {
            const whatToPress = filter.dive().find('TouchableOpacity');
            whatToPress.simulate('press');
            // testUtil.press(whatToPress);
        });
        setTimeout(() => {
            testUtil.compare(mergedData, expectedMergedData);
        },0)
    });

});