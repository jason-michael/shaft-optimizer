import { orders } from './app';
import { cutsTable } from './cutsTable';

export const enteredOrdersTable = {
    init: () => {
        $('#makeCuts').on('click', function (e) {

            // Prevent the form from submitting on click.
            e.preventDefault();

            // Return an alert if there are no orders.
            if (orders.length === 0) return alert('No orders to cut.');

            // Empties the cuts table of any previously calculated cuts.
            // $('#cutOrder').empty();

            const filteredOrders = enteredOrdersTable.filterOrdersByDiameter(orders);
            cutsTable.createTablesByDiameter(filteredOrders);

            // Show the print button & completed orders table.
            $('#cutsTable').show();
            $('#cutsTableBtns').show();
        });

        // Delete a single order
        $(document).on('click', '.deleteOrderBtn', function () {

            // Get the order ID from the parent element.
            const orderToDelete = $(this).parent().attr('orderId');

            // Remove the order from the orders array.
            orders.splice(orderToDelete, 1);

            // Remove the order row element.
            $(this).parent().remove();
        });

        // Delete all orders
        $('#clearOrders').on('click', function (e) {

            // Prevent the form from submitting on click.
            e.preventDefault();

            // Empty the orders array.
            orders.length = 0;

            // Empty the orders table.
            $('#shaftOrders').empty();
        });
    },

    /**
     * Takes a single order object, put the order info into a row, and adds the row to a given table.
     *
     * @param {*} table HTML table element to add the row to.
     * @param {Object} order Object. Must contain id, workOrderNumber, diameter, length and quantity key/values.
     */
    addOrderRowToTable: (table, order) => {
        // Create row and data elements.
        const trRow = $('<tr>').attr('orderId', order.id);
        const tdWorkOrderNumber = $('<td>').text(order.workOrderNumber);
        const tdShaftDiameter = $('<td>').text(order.diameter);
        const tdShaftLength = $('<td>').text(order.length);
        const tdShaftQuantity = $('<td>').text(order.quantity);

        // Delete button and icon.
        const deleteBtn = $('<button>').addClass('btn deleteOrderBtn mt-1');
        const deleteIcon = $('<i>').addClass('fas fa-trash');

        // Add the icon to the delete button.
        $(deleteBtn).append(deleteIcon);

        // Append data elements and delete button to the row.
        $(trRow).append(
            tdWorkOrderNumber,
            tdShaftDiameter,
            tdShaftLength,
            tdShaftQuantity,
            deleteBtn
        );

        // Append the completed row to the table.
        $(table).append(trRow);
    },

    filterOrdersByDiameter: (orders) => {
        let filteredOrders = [];
        let d175 = [];
        let d200 = [];
        let d225 = [];
        let d250 = [];

        orders.forEach(order => {
            switch (order.diameter) {
                case 1.75:
                    d175.push(order);
                    break;
                case 2:
                    d200.push(order);
                    break;
                case 2.25:
                    d225.push(order);
                    break;
                case 2.50:
                    d250.push(order);
                    break;

                default:
                    break;
            }
        });

        filteredOrders.push(d175, d200, d225, d250);

        return filteredOrders;
    }
}