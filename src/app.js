document.addEventListener('alpine:init', ()=> {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: '-- Bleyerr Coffee Saku -- PALM SUGAR ', img: '1.jpeg', price: 18000 },
            { id: 2, name: '-- Bleyerr Coffee Saku -- AMERICANO ', img: '2.jpeg', price: 18000 },
            { id: 3, name: '-- Bleyerr Coffee Saku -- COKELAT LATTE ', img: '3.jpeg', price: 13000 },
            { id: 4, name: '-- Bleyerr Coffee Saku -- TEH TARIK ', img: '4.jpeg', price: 13000 },
            { id: 5, name: '-- Bleyerr Coffee Saku -- MATCHA ', img: '5.jpeg', price: 13000 },
           
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
checkoutButton.addEventListener('click', function (e) { 
 e.preventDefault();
 const formData = new FormData(form);
 const data = new URLSearchParams(formData);
 const objData = Object.fromEntries(data);
 const message = formatMessage(objData);
 window.open('http://wa.me/628977424168?text=' + encodeURIComponent(message));

// minta transaction token menggunakan ajax / fetch
try {
  const response =  fetch ('php/placeOrder.php', {
    method: 'POST',
    body: data,
  });
  const token = response.text();
  // console.log(token);
  window.snap.pay(token);
} catch (err) {
  console.log(err.message);
 };

});

// // format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    No HP: ${obj.phone}
    Alamat: ${obj.alamat}
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