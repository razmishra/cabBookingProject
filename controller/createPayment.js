const User = require("../database_model/user")
const Payment = require("../database_model/payment")
const _ = require("lodash")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// function validateCardNumber(cardNumber){
// 	const digits = cardNumber.split('').map(Number);
// 	const lastDigit = digits.pop();
// 	const sum = digits.reverse().reduce((acc,digit, idx)=>{
// 		if(idx%2===0){
// 			digit*=2;
// 			if(digit>9) digit-=9;
// 		}
// 		return acc+digit
// 	}, lastDigit)
// 	return sum%10===0
// }


const createPayment = async (req, res) => {
	const YOUR_DOMAIN = "http://localhost:3000";
    const { product } = req.body;
    // console.log("product", product)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: product.amount * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    // console.log(req.user)
    // console.log(session.payment_status)
    const payment = new Payment({
        paymentId:session.id,
        currency:"INR",
        name:product.name,
        amount:product.amount,
        status:"succeeded"
    })
    await payment.save();
        res.json({ id: session.id });
    // console.log("session.id", session.id)
}


module.exports = createPayment;