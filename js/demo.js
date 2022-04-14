window.addEventListener('load', async () => {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        initPayButton()
      } catch (err) {
        $('#status').html('Usuario denegado el acceso a la cuenta', err)
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider)
      initPayButton()
    } else {
      $('#status').html('No se ha instalado Metamask (u otro proveedor Web3)')
    }
  })
  
  const initPayButton = () => {
  
    if (window.ethereum.chainId == '0x38') {
  
      $('.pay-button').click(() => {
  
  
        var abi = [{
            "inputs": [{
                "internalType": "uint256",
                "name": "_initialAmount",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "_tokenName",
                "type": "string"
              },
              {
                "internalType": "uint8",
                "name": "_decimalUnits",
                "type": "uint8"
              },
              {
                "internalType": "string",
                "name": "_tokenSymbol",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "constant": false,
            "inputs": [{
                "internalType": "address",
                "name": "_owner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "allocateTo",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "allowance",
            "outputs": [{
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [{
                "internalType": "address",
                "name": "_spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [{
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [{
              "internalType": "address",
              "name": "",
              "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{
              "internalType": "string",
              "name": "",
              "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{
              "internalType": "string",
              "name": "",
              "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [{
                "internalType": "address",
                "name": "dst",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "transfer",
            "outputs": [{
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [{
                "internalType": "address",
                "name": "src",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "dst",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
            "outputs": [{
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];
  
  
        // Token (Direccion del token de BUSD)
        let tokenAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

        // Direccion a enviar las BUSD
        let toAddress = "0xaf8A89A8d329a45B09a985ebB676bc5bA1cb208E";

        // BigNumber decimales
        let decimals = web3.toBigNumber(18);


        // Aqui va la cantidad de BUSD A ENVIAR
        let amount = web3.toBigNumber(10);

        // Carga del contrato ABI y Direccion del token
        let contract = web3.eth.contract(abi).at(tokenAddress);

        // Calculo de envio
        let value = amount.times(web3.toBigNumber(10).pow(decimals));

        // call transfer function
        // Funcion de tranferencia
        contract.transfer(toAddress, value, (error, txHash) => {
          // it returns tx hash because sending tx
          console.log(txHash);
        });
  
      })
    } else {
      ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: '0x38'
        }]
      });
  
    }
  
  }