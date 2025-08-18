document.addEventListener('alpine:init', ()=> {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Kopiston Expresso', img: '1.jpg', price: 9000 },
            { id: 2, name: 'Hot Crash Coffee', img: '2.jpg', price: 6000 },
            { id: 3, name: 'Hot Coffee Tea', img: '3.jpg', price: 10000 },
            { id: 4, name: 'Hot Coffee Tempoe doeloe', img: '4.jpg', price: 7000 },
            { id: 5, name: 'Hot Drip Coffee', img: '5.jpg', price: 8000 },
            { id: 6, name: 'Hot Frenchpress Coffee', img: '6.jpg', price: 12000 },
            { id: 7, name: 'ice Coffee Palm Sugar', img: '7.jpg', price: 13000 },
            { id: 8, name: 'ice Coffee Sweet Milk', img: '8.jpg', price: 13000 },
            { id: 9, name: 'Biosolar', img: '9.jpg', price: 12000 },
            { id: 10, name: 'Premium', img: '10.jpg', price: 12000 },
            { id: 11, name: 'Pertalite', img: '11.jpg', price: 12000 },
            { id: 12, name: 'Pertamax', img: '12.jpg', price: 12000 },
            { id: 13, name: 'Pertamax Plus', img: '13.jpg', price: 12000 },
            { id: 14, name: 'Tea', img: '14.jpg', price: 4000 },
            { id: 15, name: 'Jeruk', img: '15.jpg', price: 6000 },
            { id: 16, name: 'Lemon Tea', img: '16.jpg', price: 5000 },
            { id: 17, name: 'Teh Tarik', img: '17.jpg', price: 10000 },
            { id: 18, name: 'Chocolate', img: '18.jpg', price: 7000 },
            { id: 19, name: 'Thai Tea', img: '19.jpg', price: 10000 },
            { id: 20, name: 'Choco Oreo', img: '20.jpg', price: 12000 },
            { id: 21, name: 'Matcha Latte', img: '21.jpg', price: 10000 },
            { id: 22, name: 'Bubblegum latte', img: '22.jpg', price: 10000 },
            { id: 23, name: 'Jahe', img: '23.jpg', price: 6000 },
            { id: 24, name: 'Jahe Susu', img: '24.jpg', price: 11000 },
            { id: 25, name: 'Soda Senang', img: '25.jpg', price: 13000 },
            { id: 26, name: 'Beras Kencur', img: '26.jpg', price: 7000 },
            { id: 27, name: 'Mix Platter', img: '27.jpg', price: 9000 },
            { id: 28, name: 'Kentang goreng', img: '28.jpg', price: 12000 },
            { id: 29, name: 'Tahu Crispy', img: '29.jpg', price: 10000 },
            { id: 30, name: 'Donut', img: '30.jpg', price: 9000 },
            { id: 31, name: 'Sosis Bakar', img: '31.jpeg', price: 18000 },
            { id: 32, name: 'Rujak Cireng', img: '32.jpg', price: 10000 },
            { id: 33, name: 'Roti Bakar', img: '33.jpg', price: 14000 },
            { id: 34, name: 'Pisang Keju', img: '34.jpg', price: 13000 },
            { id: 35, name: 'Chicken Nugget', img: '35.jpg', price: 17000 },
            { id: 36, name: 'Scallop Ikan', img: '36.jpg', price: 12000 },
            { id: 37, name: 'Indomie Goreng', img: '37.jpg', price: 7000 },
            { id: 38, name: 'Indomie Kare', img: '38.jpg', price: 7000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
         //  cek apakah ada barang yang sama dicart
         const cartItem = this.items.find((item) => item.id === newItem.id);

         //   jika belum ada / cart masih kosong 
         if(!cartItem) {
             this.items.push({...newItem, quantity: 1, total: newItem.price});
             this.quantity++;
             this.total += newItem.price;
         } else {
            // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
            this.items = this.items.map((item) => {
                // jika barang berbeda
                if (item.id !== newItem.id) {
                    return item;
                } else {
                    //  jika barang sudah ada, tambah quantity dan totalnya
                    item.quantity++;
                    item.total = item.price * item.quantity;
                    this.quantity++;
                    this.total += item.price;
                    return item;
                }
            })
         }
        },
        remove(id) {
          // ambil item yang mau diremove berdasarkan id nya
          const cartItem = this.items.find((item) => item.id === id);

          //  jika item lebih dari satu
          if (cartItem.quantity > 1) {
            // telusuri 1 1
            this.items = this.items.map((item) => {
             // jika bukan barang yang di klik
             if (item.id !== id) {
                return item;
             } else {
               item.quantity--;
               item.total = item.price * item.quantity;
               this.quantity--;
               this.total -= item.price;
               return item;
             }
            });
          } else if (cartItem.quantity === 1) {
            //  jika barang sisa 1
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
          }
        },
    });
});

// Form Validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function () {
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
          return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

//  kirim data ketika tombol checkout diklik
checkoutButton.addEventListener('click', async function (e) { 
 e.preventDefault();
 const formData = new FormData(form);
 const data = new URLSearchParams(formData);
 const objData = Object.fromEntries(data);
//  const message = formatMessage(objData);
//  window.open('http://wa.me/6283143195623?text=' + encodeURIComponent(message));

// minta transaction token menggunakan ajax / fetch
try {
  const response = await fetch('php/placeOrder.php', {
    method: 'POST',
    body: data,
  });
  const token = await response.text();
  // console.log(token);
  window.snap.pay(token);
} catch (err) {
  console.log(err.message);
 };

// function ajaxGetToken(transactionData, callback){
//     var snapToken;
//     // Request get token to your server & save result to snapToken variable

//     if(snapToken){
//       callback(null, snapToken);
//     } else {
//       callback(new Error('Failed to fetch snap token'),null);
//     }
// }

// payButton.onclick(function(){
//   snap.show();
//   ajaxGetToken(transactionData, function(error, snapToken){
//     if(error){
//       snap.hide();
//     } else {
//       snap.pay(snapToken);
//     }
//   });
// });

});

// format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    No HP: ${obj.phone}
    Email: ${obj.email}
Data Pesanan
  ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
TOTAL: ${rupiah(obj.total)}
Terima kasih.`;
};

// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};