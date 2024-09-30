import * as bip39 from "bip39";
import {ethers} from "ethers";
import _ from "lodash";

// Command line arguments for the 11-word phrase and target Ethereum address
const args = process.argv.slice(2);

if (args.length < 2) {
    console.error("❌ Please provide the 11-word phrase and the target Ethereum address.");
    console.error("Usage: ts-node your_script.ts \"word1 word2 ... word11\" \"0xYourEthereumAddress\"");
    process.exit(1);
}

// Split the first argument (11-word phrase) into individual words
const incompletePhrase = args[0];
const words = incompletePhrase.split(" ");
if (words.length !== 11) {
    console.error("❌ The phrase should contain exactly 11 words.");
    process.exit(1);
}

const targetAddress = args[1];

// Function to check if a given phrase generates the correct address
async function checkPhrase(phrase: string): Promise<boolean> {
    try {
        const seed = await bip39.mnemonicToSeed(phrase);
        const hdNode = ethers.HDNodeWallet.fromSeed(seed);
        const derivedAddress = hdNode.derivePath("m/44'/60'/0'/0/0").address;

        if (_.toLower(derivedAddress) === _.toLower(targetAddress)) {
            console.log(`✅ Success! Derived address: ${derivedAddress} matches the target.`);
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        if (_.includes(error.message, "Invalid mnemonic")) {
            console.log(`🚫 Invalid mnemonic: ${phrase}`);
        } else {
            console.error(`💥 Unexpected error with phrase "${phrase}": ${error.message}`);
        }
        return false;
    }
}

// Generate the 12th word and check the full phrase
async function findMissingWord() {
    const wordlist = bip39.wordlists.english;

    console.log("🔍 Starting to search for the missing 12th word...");

    // Process in chunks for better feedback (logging progress every 100 words)
    const chunkedWordlist = _.chunk(wordlist, 100);
    for (let i = 0; i < chunkedWordlist.length; i++) {
        for (const word of chunkedWordlist[i]) {
            const phrase = `${incompletePhrase} ${word}`;

            if (await checkPhrase(phrase)) {
                console.log(`🎉 Found the correct phrase: ${phrase}`);
                return;
            }
        }

        console.log(`⏳ Checked up to word ${i * 100 + chunkedWordlist[i].length}/${wordlist.length}`);
    }

    console.log("😓 Could not find the correct word. Please double-check the initial information.");
}

findMissingWord();
