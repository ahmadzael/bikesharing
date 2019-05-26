// const square = (x) => x*x

// console.log(square(4))

const event = {
    name:"birthday Party",
    guestList: ['Andrw','Jen','Mike'],
    printGuestList() {
        console.log('Guest List For ' + this.name)

        this.guestList.forEach((guest)=> {
            console.log(guest + 'is attending' + this.name)
        })
    }
}

event.printGuestList()