// webUser -
class WebUser {
    customer = null;
    shoppingCart = null;

    constructor(login_id, password, state) {
        this.id = login_id;
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

// Customer 
class Customer {
    account = null;

    constructor(name, address, phone, email) {
        this.name = name;
        this.address = address
        this.phone = phone;
        this.emall = email;
    }
    addAccout(account) {
        this.account = account;
    }

}

// Account 
class Account {
    shoppingCart = null;
    payments = [];
    orders = [];

    constructor(id, address, open, closed) {
        this.id = id;
        this.address = address;
        this.open = open;
        this.closed = closed
    }
    setShoppingCart(shoppingCart) {
        this.shoppingCart = shoppingCart;
    }
    addPayment(payment) {
        this.payments.push(payment);
    }
    addOrders(order) {
        this.orders.push(order);
    }
}

// Shopping Cart 
class shoppingCart {
    lineItems = [];
    constructor(created) {
        this.created = created;
    }
    addLineiItem(lineItem) {
        this.lineItems.push(lineItem);
    }
}

// Order 
class Order {
    payments = null;
    lineItems = [];
    total = 0;
    constructor(number, ordered, shipped, ship_to, status) {
        this.number = number;
        this.ordered = ordered;
        this.shipped = shipped;
        this.ship_to = ship_to;
        this.status = status;
    }
    setPayment(payment) {
        this.payment = payment;
    }
    addLineiItem(lineItem) {
        this.lineItems.push(lineItem)
    }
}

// Line Item 
class lineItem {
    product = null;
    constructor(quantity, price) {
        this.quantity = quantity;
        this.price = price;
    }
    setProduct(product) {
        this.product = product;
    }
}

// Product 
class Product {
    constructor(id, name, supplier) {
        this.id = id;
        this.name = name;
        this.supplier = supplier;
    }
}

// Payment 
class Payment {
    constructor(id, paid, total, details) {
        this.id = id;
        this.paid = paid;
        this.total = total;
        this.details = details;
    }
}


// Enumeration (enum) --------------------------------------------- //
class UserState {
    static NEW = new UserState("new");
    static ACTIVE = new UserState("active");
    static BLOCK = new UserState("block");
    static BANNED = new UserState("banned");
    constructor(name) {
        this.name = name;
    }
}

class OrderStatus {
    static NEW = new OrderStatus("new");
    static HOLD = new OrderStatus("hold");
    static Shipped = new OrderStatus("shipped");
    static DELIVERED = new OrderStatus("delivered");
    static CLOSED = new OrderStatus("closed");

    constructor(name) {
        this.name = name;
    }
}

const main = () => {
    // สร้างข้อมูลลูกค้า CUSTOMER
    const user1 = new WebUser("user1", "123456", UserState.NEW);
    const user2 = new WebUser("user2", "342568", UserState.ACTIVE);

    // สร้างสินค้า PRODUCT
    const product1 = new Product(1, "PEN1", "SUP1");
    const product2 = new Product(2, "PEN2", "SUP2");
    const product3 = new Product(3, "PEN3", "SUP3");
    const product4 = new Product(4, "PEN4", "SUP4");
    const product5 = new Product(5, "PEN5", "SUP5");

    // สร้างคำสั่งซื้อ Order
    const order1 = new Order("01", "09/01/2567", "09/01/2567", "BANBEST1", OrderStatus.CLOSED, 1.15);
    const order2 = new Order("02", "09/01/2567", "09/01/2567", "BANBEST2", OrderStatus.CLOSED, 1.25);
    const order3 = new Order("03", "09/01/2567", "09/01/2567", "BANBEST3", OrderStatus.CLOSED, 1.35);
    const order4 = new Order("04", "09/01/2567", "09/01/2567", "BANBEST4", OrderStatus.CLOSED, 1.45);
    const order5 = new Order("05", "09/01/2567", "09/01/2567", "BANBEST5", OrderStatus.CLOSED, 1.55);

    user1.addLineiItem(order1);
    console.log(user1);
}
main();