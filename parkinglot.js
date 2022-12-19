let data = {};
// let parkingLotTime = 5000;
// let parkTime = 3000;
// let leaveTime = 1500;
// let checkTime= 500;

let parkingLotTime = 1
let parkTime = 1
let leaveTime = 1
let checkTime= 1

class Car{
    constructor(nopol,pemilik){
      this.nopol = nopol;
      this.pemilik = pemilik;
    }

    getNopol(){
        return this.nopol;
    }

    getPemilik(){
        return this.pemilik;
    }
  }


const parkingLot = async (capacity) => new Promise((resolve) => {
    setTimeout(() => {
        data = {capacity,remaining:capacity, parkedCars:[]};
        console.log(`Tempat parkir berhasil dibuat dengan kapasitas ${capacity} kendaraan`);
        
        resolve({park,leave,check});
    },parkingLotTime)
});


const park = async (car) => new Promise((resolve) => {
    setTimeout(() => {
        if(data.parkedCars.length+1 > data.capacity){
            console.log("Mohoh maaf parkir sudah penuh.");
            resolve("gagal");
            return;
        }


        let isParkir = data.parkedCars.slice().findIndex(carCheck => {
           return carCheck.getNopol() === car.nopol
        })

        
        if(isParkir >= 0){
            console.log(`Mobil ${car.pemilik} dengan Nopol ${car.nopol} sudah parkir sebelumnya.`);
            resolve("gagal");
            return;
        }

        data.parkedCars.push(car);
        data.remaining -= 1;

        console.log(`Mobil ${car.pemilik} dengan nopol ${car.nopol} berhasil parkir`);

        resolve(car);
    },parkTime)

});

const leave = (nopol) => new Promise((resolve) => {
    setTimeout(() => {
        let carLeave = {}
        let isLeave = false;

        parkedCars = data.parkedCars.filter((car) => {
            if(car.getNopol() === nopol){
               carLeave.nopol = car.getNopol();
               carLeave.pemilik = car.getPemilik();
               isLeave = true;
            }
            return car.getNopol() !== nopol;
        });
        

        if(isLeave){
            remaining = data.remaining+1;

            data = {...data, remaining, parkedCars};
            console.log(`Mobil ${carLeave.pemilik} dengan Nopol ${carLeave.nopol} sudah keluar.`)
    
            resolve(data);
        }else{
            console.log(`Mobil dengan Nopol ${nopol} tidak bisa keluar karena tidak terdaftar.`)
            resolve(data)
        }

       
    },leaveTime)
});
  
const check = () => {
    setTimeout(async () => {
        console.log(data);
    },checkTime)
}


async function wrap(){
    try{
        await parkingLot(5);

        let car = new Car("B02E1","DIPA");
        await park(car);

        let car2 = new Car("B02E2","DIPA");
        await park(car2);

        let car3 = new Car("B02E3","DIPA");
        await park(car3);

        let car4 = new Car("B02E4","DIPA");
        await park(car4);

        let car5 = new Car("B02E4","DIPA");
        await park(car5);


        let car6 = new Car("B02E5","DIPA");
        await park(car6);


        await leave("B02E6");
        await leave("B02E1");

      
        check();
    }catch(e){
        console.log(e.message);
    }
}

wrap();