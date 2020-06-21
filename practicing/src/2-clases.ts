class Department{
    name?: string;
    description?: string;

    constructor(name?: string, description?: string){
        this.name = name;
        //this.describe = this.describe.bind(this);
    }

    describe(this: Department){//el parametro this obliga a que este metodo sea invocado por un Department, si no No compila!!
        console.log('Department:', this.name);
        console.log('Description:', this.description);
    }

}

const accounting = new Department('accounting');
accounting.describe();

const accountingCopy = { name:  'New accounting!!',describe: accounting.describe };
accountingCopy.describe();
const accounting2 = new Department();
accounting2.describe();
