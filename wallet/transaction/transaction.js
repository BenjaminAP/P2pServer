const ChainUtil = require('../../utils/chain_util');
const OutDetails = require(`./output_details`);
const inDetails = require(`./input_details`);

class Transaction {
    constructor(senderWallet, recipient, amount) {

        this.id = ChainUtil.generateUID();
        this.input = null;
        this.output = new OutDetails(senderWallet, recipient, amount);
    }

    getOutputSender() {
        return JSON.stringify(this.output.sender);
    }

    getOutputRecipient() {
        return JSON.stringify(this.output.recipient);
    }

    toString() {
        return `Transaction:
            id      : ${this.id}
            input   : ${this.input}
            output  : ${this.output}`
    }

    // static newTransaction(senderWallet, recipient, amount) {
    //
    //     if (senderWallet.balance < amount){
    //         console.log("Amount send larger than balance.");
    //         return;
    //     }
    //
    //     let transaction = new Transaction();
    //     // const outDetails =
    //
    //     transaction.output = new OutDetails(senderWallet, recipient, amount);
    //
    //     return transaction;
    // }

    toString() {
        return `Transaction :
        id      : ${this.id}
        input   : ${this.input}
        output  : ${JSON.stringify(this.output)}`
    }
}

module.exports = Transaction;