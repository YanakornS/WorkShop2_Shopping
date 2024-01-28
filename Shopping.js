//class Customer
class Customer {
    orders = [];
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    addOrder(order) {
        this.orders.push(order);
    }
}

// class Order
class Order {
    payments = null;
    orderDetails = [];
    constructor(date, status) {
        this.date = date;
        this.status = status;
    }
    calcSubTotal() {
        //return this.orderDetails.reduce((total, orderDetail) => total + orderDetail.subTotal(), 0);
        let subTotal = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            subTotal += this.orderDetails[i].calcSubTotal();
        }
        return subTotal;
    }

    calcTax() {
        //return this.orderDetails.reduce((total, orderDetail) => total + orderDetail.subTotal(), 0);
        let tax = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            tax += this.orderDetails[i].calcTax();
        }
        return tax;
    }

    calcTotal() {
        return this.calcSubTotal();
    }

    calcTotalWeight() {
        //return this.orderDetails.reduce((total, orderDetail) => total + orderDetail.subTotal(), 0);
        let Weight = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            Weight += this.orderDetails[i].calcTotalWeight();
        }
        return Weight;
    }

    addPayment(payment) {
        this.payments = payment;
    }
    addOrderDetail(orderDetail) {
        this.orderDetails.push(orderDetail);
    }
    printDetail() {
        for (let i = 0; i < this.orderDetails.length; i++) {
            console.log(
                "รายการที่ : " + (i + 1) + " " + this.orderDetails[i].getDetail()
            );
        }
        console.log("รวมทั้งหมด " + this.calcTotal() + " บาท");
        this.payments.printPayment();
    }
}

// class OrderDetail
class orderDetail {
    item = null;
    constructor(quantity, taxStatus) {
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }
    calcSubTotal() {
        return this.item.getPriceForQuantity(this.quantity) + this.calcTax();
    }
    calcWeight() {
        return this.item.shippingWeight;
    }
    calcTax() {
        return this.item.getTax(this.taxStatus);
    }
    addItem(item) {
        this.item = item;
    }
    getDetail() {
        return (
            this.item.description +
            " จำนวน " +
            this.quantity +
            " ราคา " +
            this.calcSubTotal() +
            " บาท"
        );
    }
}

// class Item
class Item {
    inStock = true;
    constructor(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.description = description;
        this.price = price;
    }

    setInStock(status) {
        this.inStock = status;
    }

    getPriceForQuantity(quantity) {
        return this.price * quantity;
    }
    getTax(taxStatus) {
        if (taxStatus === "Tax included") {
            return 0;
        } else {
            return this.price * 0.07;
        }
    }
    inStock() {
        return this.inStock;
    }
}

// class Payment
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    printPayment() {
        console.log("ชำระด้วย.... ");
    }
}

// class Cash
class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }

    printPayment() {
        console.log("ชำระด้วยเงินสด จำนวน " + this.amount + " บาท");
    }
}

// class Check
class Check extends Payment {
    constructor(amount, name, bankID) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
    printPayment() {
        console.log("ชำระด้วยเช็ค จำนวน " + this.amount + " บาท");
    }

    authorized() {
        console.log("authorized");
    }
}

// class Credit
class Credit extends Payment {
    constructor(amount, number, type, expDate) {
        super(amount); // Amount is not specified
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
    printPayment() {
        console.log("ชำระด้วยบัตรเครดิต จำนวน " + this.amount + " บาท");
    }

    authorized() {
        console.log("authorized");
    }
}

//==============================================================================================================
//
// const oldMain

const OMain = () => {
    let customer1 = new Customer("Yanakorn", "111/64");
    let customer2 = new Customer("Chayatip", "Nakonpathon");
    //console.log(Customer1);
    //ProductItem
    const item1 = new Item(0.3, "ออลอินวันบักเก็ต", 299);
    const item2 = new Item(0.1, "ป๊อบบอมบ์แซ่บ", 39);
    const item3 = new Item(0.2, "เดอะบอกซ์ออลสตาร์", 159);
    const item4 = new Item(0.3, "เดอะบอกซ์ซิคเนเจอร์", 169);
    const item5 = new Item(0.5, "ชุดข้าวไก่กรอบแกงเขียวหวานเคเอฟซีร์", 109);

    //create order
    const order1 = new Order("08/01/2567", "In proocess");
    const order2 = new Order("08/01/2567", "In proocess");
    const order3 = new Order("10/01/2567", "In proocess");

    // เพิ่มคำสั่งซื้อลงในลูกค้า
    customer1.addOrder(order1);

    // console.log(customer1);

    // สร้างรายละเอียดคำสั่งซื้อ OrderDetail
    const orderDetail1 = new orderDetail(5, "Tax included");
    orderDetail1.addItem(item1);
    const orderDetail2 = new orderDetail(2, "Tax included");
    orderDetail2.addItem(item2);
    const orderDetail3 = new orderDetail(1, "Tax included");
    orderDetail3.addItem(item5);
    const orderDetail4 = new orderDetail(3, "Tax included");
    orderDetail4.addItem(item3);
    const orderDetail5 = new orderDetail(2, "Tax included");
    orderDetail5.addItem(item4);

    // เพิ่มรายละเอียดคำสั่งซื้อลงในคำสั่งซื้อ
    order1.addOrderDetail(orderDetail1);
    order1.addOrderDetail(orderDetail2);

    //order2
    customer2.addOrder(order2);
    // เพิ่มรายละเอียดคำสั่งซื้อลงในคำสั่งซื้อ
    order2.addOrderDetail(orderDetail3);
    order2.addOrderDetail(orderDetail4);
    order2.addOrderDetail(orderDetail5);

    //console.log(customer1.orders);
    console.log("ชื่อ : " + customer1.name);
    console.log("จำนวนคำสั่งซื้อ : " + customer1.orders.length);

    for (let i = 0; i < customer1.orders.length; i++) {
        console.log("คำสั่งซื้อที่ : " + (i + 1));
        let total = 0;

        for (let a = 0; a < customer1.orders[i].orderDetails.length; a++) {
            const item = customer1.orders[i].orderDetails[a].Item;
            const quantity = customer1.orders[i].orderDetails[a].quantity;
            const subTotal = quantity * item.price;
            total += subTotal;

            console.log(
                "ลำดับที่ : " +
                (a + 1) +
                " " +
                item.description +
                " จำนวน " +
                quantity +
                " ราคา " +
                subTotal +
                " บาท"
            );
        }
        console.log("รวมทั้งหมด " + total + " บาท");
    }

    //console.log(customer2.orders);
    console.log("ชื่อ : " + customer2.name);
    console.log("จำนวนคำสั่งซื้อ : " + customer2.orders.length);

    for (let i = 0; i < customer2.orders.length; i++) {
        console.log("คำสั่งซื้อที่ : " + (i + 1));
        let total = 0;

        for (let a = 0; a < customer2.orders[i].orderDetails.length; a++) {
            const item = customer2.orders[i].orderDetails[a].Item;
            const quantity = customer2.orders[i].orderDetails[a].quantity;
            const subTotal = quantity * item.price;
            total += subTotal;

            console.log(
                "ลำดับที่ : " +
                (a + 1) +
                " " +
                item.description +
                " จำนวน " +
                quantity +
                " ราคา " +
                subTotal +
                " บาท"
            );
        }
        console.log("รวมทั้งหมด " + total + " บาท");
    }
};

// const main
const main = () => {
    // สร้างข้อมูลลูกค้า
    let customer1 = new Customer("Yanakorn", "111/64");
    let customer2 = new Customer("Chayatip", "Nakonpathon");
    //console.log(customer1);

    // สร้างสินค้า Item
    const item1 = new Item(0.3, " ออลอินวันบักเก็ต ", 299);
    const item2 = new Item(0.1, " ป๊อบบอมบ์แซ่บ ", 39);
    const item3 = new Item(0.2, " เดอะบอกซ์ออลสตาร์ ", 159);
    const item4 = new Item(0.3, " เดอะบอกซ์ซิคเนเจอร์ ", 169);
    const item5 = new Item(0.5, " ชุดข้าวไก่กรอบแกงเขียวหวานเคเอฟซีร์ ", 109);

    // สร้างคำสั่งซื้อ Order
    const order1 = new Order("08/01/2567", "In proocess");
    const order2 = new Order("08/01/2567", "In proocess");
    const order3 = new Order("10/01/2567", "In proocess");

    // สร้างรายละเอียดคำสั่งซื้อ OrderDetail
    const orderDetail1 = new orderDetail(5, "Tax not included");
    orderDetail1.addItem(item1);
    const orderDetail2 = new orderDetail(2, "Tax not included");
    orderDetail2.addItem(item2);
    const orderDetail3 = new orderDetail(1, "Tax included");
    orderDetail3.addItem(item5);
    const orderDetail4 = new orderDetail(3, "Tax included");
    orderDetail4.addItem(item3);
    const orderDetail5 = new orderDetail(2, "Tax included");
    orderDetail5.addItem(item4);
    const orderDetail6 = new orderDetail(1, "Tax included");
    orderDetail6.addItem(item1);

    // เพิ่มคำสั่งซื้อลงในลูกค้าคนที่ 1
    customer1.addOrder(order1);
    customer1.addOrder(order2);

    // เพิ่มคำสั่งซื้อลงในลูกค้าคนที่ 2
    customer2.addOrder(order2);
    customer2.addOrder(order3);

    // เพิ่มรายละเอียดคำสั่งซื้อลงในคำสั่งซื้อ order1
    order1.addOrderDetail(orderDetail1);
    order1.addOrderDetail(orderDetail2);

    // เพิ่มรายละเอียดคำสั่งซื้อลงในคำสั่งซื้อ order2
    order2.addOrderDetail(orderDetail3);
    order2.addOrderDetail(orderDetail4);
    order2.addOrderDetail(orderDetail5);

    // เพิ่มรายละเอียดคำสั่งซื้อลงในคำสั่งซื้อ order3
    order3.addOrderDetail(orderDetail6);
    order3.addOrderDetail(orderDetail3);
    order3.addOrderDetail(orderDetail5);

    //Payment
    const cash = new Cash(order1.calcTotal(), "");
    customer1.orders[0].addPayment(cash);

    const credit = new Credit(
        order2.calcTotal(),
        "123457878787521",
        "credit",
        "10/24"
    );
    customer1.orders[1].addPayment(credit);

    // // แสดงรายละเอียดคำสั่งซื้อสำหรับลูกค้าคนที่ 1
    // console.log("ชื่อ : " + customer1.name);
    // console.log("จำนวนคำสั่งซื้อ : " + customer1.orders.length);
    // for (let i = 0; i < customer1.orders.length; i++) {
    //     console.log("คำสั่งซื้อที่ : " + (i + 1));
    //     for (let q = 0; q < customer1.orders[i].orderDetails.length; q++) {

    //         console.log(
    //             "รายการที่ : " +
    //             (q + 1) + " " +
    //             customer1.orders[i].orderDetails[q].item.description +
    //             " จำนวน " +
    //             customer1.orders[i].orderDetails[q].quantity +
    //             " ราคา " +
    //             customer1.orders[i].orderDetails[q].calcSubTotal() +
    //             " บาท"
    //         );
    //     }
    //     console.log("รวมทั้งหมด " + customer1.orders[i].calcSubTotal() + " บาท");
    // }
    // console.log("//////////////////////////////////////////////");
    // // แสดงรายละเอียดคำสั่งซื้อสำหรับลูกค้าคนที่ 2
    // console.log("ชื่อ : " + customer2.name);
    // console.log("จำนวนคำสั่งซื้อ : " + customer2.orders.length);

    // customer2.orders.forEach((order, i) => {
    //     console.log("คำสั่งซื้อที่ : " + (i + 1));

    //     order.orderDetails.map((orderDetail, q) => {
    //         console.log(
    //             "รายการที่ : " +
    //             (q + 1) + " " +
    //             orderDetail.item.description +
    //             " จำนวน " +
    //             orderDetail.quantity +
    //             " ราคา " +
    //             orderDetail.calcSubTotal() +
    //             " บาท"
    //         );
    //     });

    //     console.log("รวมทั้งหมด " + order.calcSubTotal() + " บาท");
    // });

    console.log("ชื่อ : " + customer1.name);
    console.log("จำนวนคำสั่งซื้อ : " + customer1.orders.length);
    for (let i = 0; i < customer1.orders.length; i++) {
        console.log("คำสั่งซื้อที่ : " + (i + 1));
        customer1.orders[i].printDetail();
    }
};

main();