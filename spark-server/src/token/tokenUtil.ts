import { SITokenABI } from './SITokenABI'
import userModel from "../models/user.model";
// import { signERC2612Permit } from 'eth-permit';
// import { ethers } from 'ethers'

const TOKEN_CONTRACT_ADDRESS='0xDa2cC46367a64A2798904f52Ce39c4f66D4d776d'
const TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS='0x3dD51a69aA684EC7CbE2CC2C075311aA872C7A4B'
const VOTING_TOKEN_AMOUNT=1
const INCENTIVE_TOKEN_AMOUNT=3
const GAS_FEE=1000000

require('dotenv').config()

declare var process : {
    env: {
        INFURA_ENDPOINT: string,
        SPARK_IT_TOKEN_ACCOUNT_SECRET_KEY: string,
        PRIVATE_KEY_SECRET: string
    }
}

export async function getUserBalance(userAccount:String) {
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT)); 
    const contract = new web3.eth.Contract(SITokenABI, TOKEN_CONTRACT_ADDRESS, { from: TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS, gas: GAS_FEE});
    return await contract.methods.balanceOf(userAccount).call()
}

export async function sendTokenToWriter(writerAccount:String, writerUserId:Number){
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT)); 
    const contract = new web3.eth.Contract(SITokenABI, TOKEN_CONTRACT_ADDRESS, { from: TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS, gas: GAS_FEE});
    web3.eth.accounts.wallet.add(process.env.SPARK_IT_TOKEN_ACCOUNT_SECRET_KEY);
    await contract.methods.transfer(writerAccount, INCENTIVE_TOKEN_AMOUNT).send({from: TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS, gas: GAS_FEE});
    updateUserBalance(writerUserId, writerAccount)

}

export async function voteToOtherUser(senderAccount:string, senderPrivateKey:String, senderUserId:Number, receiverAccount:String, receiverUserId:Number) {
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT)); 
    const contract = new web3.eth.Contract(SITokenABI, TOKEN_CONTRACT_ADDRESS, { from: TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS, gas: GAS_FEE});

     //디코딩
    const decryptedPrivateKey = require('aes256').decrypt(process.env.PRIVATE_KEY_SECRET, senderPrivateKey)
    web3.eth.accounts.wallet.add(decryptedPrivateKey);
    await contract.methods.transfer(receiverAccount, VOTING_TOKEN_AMOUNT).send({from: senderAccount, gas: GAS_FEE});

    // permit 사용 시도 
    // const wallet = new ethers.Wallet(decryptedPrivateKey, new ethers.providers.JsonRpcProvider(process.env.INFURA_ENDPOINT));
    // const senderAddress = wallet.address
    // const result = await signERC2612Permit(wallet, tokenAddress, senderAddress, spender, value);

    // await token.methods.permit(senderAddress, spender, value, result.deadline, result.v, result.r, result.s).send({
    // from: senderAddress,
    // });

    // const result = await signERC2612Permit(wallet, TOKEN_CONTRACT_ADDRESS, wallet.address, TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS, VOTING_TOKEN_AMOUNT);
    // await contract.methods.permit(wallet.address, TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS, VOTING_TOKEN_AMOUNT, result.deadline, result.v, result.r, result.s).call({
    //   from: senderAccount,
    // });
    updateUserBalance(senderUserId, senderAccount)
    updateUserBalance(receiverUserId, receiverAccount)
}

async function updateUserBalance(userId:Number, userAccount:String) {
    let currentBalance = await getUserBalance(userAccount)
    await userModel.update({balance: currentBalance}, {where: {id: userId}})
}

export async function giveNewUserEther(userAccount:String) {
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT)); 
    web3.eth.accounts.wallet.add(process.env.SPARK_IT_TOKEN_ACCOUNT_SECRET_KEY);
    const amount = 1; // Willing to send 2 ethers
    const amountToSend =  web3.utils.toWei(String(amount),'ether') // Convert to wei value
    // await contract.methods.transfer(receiverAccount, VOTING_TOKEN_AMOUNT).send({from: senderAccount, gas: GAS_FEE});
    await web3.eth.sendTransaction({ from: TOKEN_CONTRACT_DEPLOYED_OWNER_ADDRESS, to: userAccount, value: amountToSend, gasLimit: GAS_FEE});
}