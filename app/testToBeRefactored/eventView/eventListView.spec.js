// /**
//  * Created by AAB3605 on 22/03/2017.
//  */
// import testUtil from '../testUtil';
// import testComponents from '../TestUtil/testComponents';
//
// describe('EventListView', () => {
//
//     it('should display a list view with an event card for each event in the data source', () => {
//         let event = {
//             name: 'Grill&Beer',
//             description: 'Spring is around the corner',
//             location: "The boss' balcony",
//             data: 'today',
//             participating: true
//         }
//         const events = [event, event, event] ;
//         const eventListView = testComponents.get('EventListView', {
//             events
//         });
//         expect(eventListView.find('ListView').children().root.node.props.dataSource._dataBlob).to.have.length(3);
//     });
//
// });