// Soal:
// Buatlah software kasir bioskop yang dapat mengalokasikan jumlah kursi yang tersedia dan untuk melayani penjualan tiket.
// Sebuah Studio di dalam bioskop memiliki jumlah kursi sebanyak ’n’ maksimal 20 kursi, setiap kursi memiliki kode label yang unik, contoh A1, A2, A3, A4.
// Setiap kode label kursi hanya dapat di beli oleh 1 orang.
// Setiap kursi yang telah terjual dapat di batalkan.
// Software dapat mengeluarkan laporan status denah.
// Software dapat mengeluarkan laporan penjualan berikut tanggal dan waktu penjualan.

// Soal:
// Buatlah software kasir bioskop yang dapat mengalokasikan jumlah kursi yang tersedia dan untuk melayani penjualan tiket.
// Sebuah Studio di dalam bioskop memiliki jumlah kursi sebanyak ’n’ maksimal 20 kursi, setiap kursi memiliki kode label yang unik, contoh A1, A2, A3, A4.
// Setiap kode label kursi hanya dapat di beli oleh 1 orang.
// Setiap kursi yang telah terjual dapat di batalkan.
// Software dapat mengeluarkan laporan status denah.
// Software dapat mengeluarkan laporan penjualan berikut tanggal dan waktu penjualan.

const readline = require("readline");

class Bioskop {
  constructor(label, total) {
    this.label = label;
    this.total = total;
    this.seats = [];
  }
  menus() {
    return `
=================== Pilih salah satu menu di bawah ini  =================== 
A) Pemesanan Kursi —> book_seat {seat_code}
B) Batalkan Kursi —> cancel_seat {seat_code}
C) Laporan Denah —> seats_status
D) Laporan Transaksi —> transaction_status
Masukkan ‘Exit' untuk keluar.`;
  }
  configured() {
    if (this.total > 20) {
      console.log(`Jumlah kursi maksimal ${20}`);
    } else {
      for (let i = 0; i < this.total; i++) {
        let seat = {
          name: `${this.label}${i + 1}`,
          status: "Free",
          booking_time: null,
          cancel_time: null,
        };
        this.seats.push(seat);
      }
      console.log(
        `=================== Aplikasi Cinema XXI Layout (kursi tersedia ${this.label}-${this.total}) ===================`
      );
      console.log(this.menus());
    }
  }

  seats_status() {
    console.log(`=================== Denah Status =================== `);
    for (let i = 0; i < this.seats.length; i++) {
      console.log(`${this.seats[i].name} - ${this.seats[i].status}`);
    }
  }
  book_seat(seatCode) {
    let idx = this.seats.findIndex((seat) => seat.name == seatCode);
    if (idx == -1) {
      console.log(`Kursi dengan kode ${seatCode} tidak tersedia!`);
    } else {
      console.log(`Proses booking kursi ${seatCode} berhasil!`);
      this.seats.map((seat) => {
        if (seat.name == seatCode) {
          (seat.status = "Sold"), (seat.booking_time = new Date());
        }
        return seat;
      });
    }
  }
  cancel_seat(seatCode) {
    let idx = this.seats.findIndex((seat) => seat.name == seatCode);
    if (idx == -1) {
      console.log(`Kursi dengan kode ${seatCode} tidak tersedia!`);
    } else {
      console.log(`Proses cancel kursi ${seatCode} berhasil!`);
      this.seats.map((seat) => {
        if (seat.name == seatCode) {
          (seat.status = "Free"), (seat.cancel_time = new Date());
        }
        return seat;
      });
    }
  }
  transaction_status() {
    console.log(`=================== Denah Status =================== `);
    let seatFree = [],
      seatSold = [];
    for (let i = 0; i < this.seats.length; i++) {
      if (this.seats[i].status == "Free") {
        seatFree.push(this.seats[i]);
      } else {
        seatSold.push(this.seats[i]);
      }
      if (i == this.seats.length - 1) {
        console.log(
          `Total ${seatFree.length} Free, ${seatSold.length} Sold, format (seat_code, datetime)`
        );
        if (seatSold.length > 0) {
          for (let j = 0; j < seatSold.length; j++) {
            let splitDate = seatSold[j].booking_time
              .toString()
              .split("GMT")[0]
              .split(" ");
            console.log(
              `${seatSold[j].name}, ${splitDate[2]}-${splitDate[1]}-${splitDate[3]} ${splitDate[4]}`
            );
          }
        }
      }
    }
  }
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = () => {
  rl.question("Masukkan Label Kursi :  ", (answer1) => {
    rl.question("Masukkan Jumlah Kursi :  ", (answer2) => {
      const cinema_kita = new Bioskop(answer1, answer2);
      cinema_kita.configured();
      rl.on("line", function (line) {
        let commands = line.split(" ");
        let seatCode = "";
        if (commands[1] && commands[1].length > 0) {
          for (let i = 0; i < commands[1].length; i++) {
            if (commands[1][i] !== "{" && commands[1][i] !== "}") {
              seatCode += commands[1][i];
            }
          }
        }
        switch (commands[0]) {
          case "book_seat":
            cinema_kita.book_seat(seatCode);
            cinema_kita.seats_status();
            break;
          case "cancel_seat":
            cinema_kita.cancel_seat(seatCode);
            cinema_kita.seats_status();
            break;
          case "transaction_status":
            cinema_kita.transaction_status();
            break;
          case "seats_status":
            cinema_kita.seats_status();
            break;
          case "Exit":
            process.exit(0);
            break;
          default:
            console.log("Maaf, perintah tidak dikenali `" + line + "`");
            cinema_kita.menus();
            break;
        }
        rl.prompt();
      }).on("close", function () {
        console.log("Have a great day!");
        process.exit(0);
      });
    });
  });
};

main();
