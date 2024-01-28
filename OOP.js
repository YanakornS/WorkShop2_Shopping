class Customer {
    account = null;
    constructor(id, address, phone, email) {
        this.id = id;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
    setAccount(account) {
        this.account = account;
    }
}

class WebUser {
    customer = null;
    shoppingCart = null;
    constructor(login_id, password, state) {
        this.login_id = login_id;
        this.password = password;
        this.state = state;
    }
    setCustomer(customer) {
        this.customer = customer;
    }
    setShoppingCart(shoppingCart) {
        this.shoppingCart = shoppingCart;
    }
}

class Product {
    constructor(id, name, supplier) {
        this.id = id;
        this.name = name;
        this.supplier = supplier;
    }
}

class Payment {
    constructor(id, paid, total, details) {
        this.id = id;
        this.paid = paid;
        this.total = total;
        this.details = details;
    }
}

class Account {
    shoppingCart = null;
    payments = [];
    orders = [];
    constructor(id, billing_address, is_closed, open, closed) {
        this.id = id;
        this.billing_address = billing_address;
        this.is_closed = is_closed;
        this.open = open;
        this.closed = closed;
    }
    setShoppingCart(shoppingCart) {
        this.shoppingCart = shoppingCart;
    }
    addPayment(payment) {
        this.payments.push(payment);
    }
    addOrder(order) {
        this.orders.push(order);
    }
}

class LineItem {
    product = null;
    constructor(quantity, price) {
        this.quantity = quantity;
        this.price = price;
    }
    setproduct(product) {
        this.product = product;
    }
}
class ShoppingCart {
    lineItems = [];
    constructor(created) {
        this.created = created;
    }
    addLineItem(lineItem) {
        this.lineItems.push(lineItem);
    }
}

class Order {
    payment = null;
    lineItems = [];
    total = 0;
    shipped = "";
    constructor(number, ordered, status, ship_to) {
        this.number = number;
        this.ordered = ordered;

        this.status = status;
        this.ship_to = ship_to;
    }
    setPayment(payment) {
        this.payment = payment;
    }
    addLineItem(lineItem) {
        this.lineItems.push(lineItem);
    }
    setTotal() {
        let total = 0;
        for (let i = 0; i < this.lineItems.length; i++) {
            total += this.lineItems[i].quantity * this.lineItems[i].price;
        }
        this.total = total;
    }
    setShippedDate(date) {
        this.shipped = date;
    }
}

//Enumeration (enum)
class UserState {
    static NEW = new UserState("new");
    static ACTIVE = new UserState("active");
    static BLOCKED = new UserState("blocked");
    static BANNED = new UserState("banned");
    constructor(name) {
        this.name = name;
    }
}

class OrderStatus {
    static NEW = new OrderStatus("new");
    static HOLD = new OrderStatus("hold");
    static SHIPPED = new OrderStatus("shipped");
    static DELIVERED = new OrderStatus("delivered");
    static CLOSED = new OrderStatus("closed");

    constructor(name) {
        this.name = name;
    }
}

const main = () => {
    const user1 = new WebUser("user1", "123456", UserState.NEW);
    const user2 = new WebUser("user2", "123456", UserState.ACTIVE);
    console.log(user1.state);

    const pen = new Product(1, "pen", "Ice");
    const pencil = new Product(2, "pencil", "TAN");
    const colors = new Product(3, "colors", "ice");
    const paper = new Product(4, "paper", "ice");
    const cardboard = new Product(5, "cardboard", "ice");

    const order1 = new Order("01", "05/01/2567", "Bankay", OrderStatus.CLOSED);

    const lineItem1 = new LineItem(10, 15);
    lineItem1.setproduct(pen);
    const lineItem2 = new LineItem(10, 15);
    lineItem2.setproduct(pencil);
    const lineItem3 = new LineItem(2, 1);
    lineItem3.setproduct(paper);

    order1.addLineItem(lineItem1);
    order1.addLineItem(lineItem2);
    order1.addLineItem(lineItem3);

    order1.setTotal();

    order1.setShippedDate("30/01/2567");

    const payment1 = new Payment("p01", "22/01/2567", order1.total, "ส่งที่บ้านพัก");
    order1.setPayment(payment1);
    console.log(order1);
};
main();