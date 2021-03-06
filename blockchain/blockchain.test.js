const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {

    let blockchain;
    let blockchain2;

    beforeEach(() => {
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });

    it('Verify that genesis block match the original', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('Invalidates corrupt genesis block', () => {
        blockchain2.chain[0].data = 'corrupt data';

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it('Mined block verified data', () => {
        const data = 'test';
        const newBlock = blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length -1].data).toEqual(data);
    });

    it('Validate chain', () => {
        blockchain2.addBlock('data');

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
    });

    it('Invalidate corrupt chain', () => {
        blockchain2.addBlock('test');
        blockchain2.chain[1].data = 'corrupt data';

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it('Replaces chain with longer chain' , () => {
        blockchain2.addBlock('test');
        blockchain.replaceChain(blockchain2.chain);

        expect(blockchain.chain).toEqual(blockchain2.chain);
    });

    it('Does not replace chain with shorter chain', () => {
        blockchain.addBlock('test');
        blockchain.replaceChain(blockchain2.chain);

        expect(JSON.stringify(blockchain.chain)).not.toEqual(JSON.stringify(blockchain2.chain));
    });
});