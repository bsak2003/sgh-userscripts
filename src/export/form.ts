enum Form {
    WYK = "W",
    CW = "C",
    KON = "K",
    LAB = "L",
    KINT = "KINT"
}

function parseForm(value: string) : Form {
    switch(value){
        case 'WYK':{
            return Form.WYK;
            break;
        }

        case 'CW': {
            return Form.CW;
            break;
        }

        case 'KON':{
            return Form.KON;
            break;
        }

        case 'LAB':{
            return Form.LAB;
            break;
        }

        case 'KINT':{
            return Form.KINT;
            break;
        }

        default: {
            throw new Error();
            break;
        }
    }
}

export { Form, parseForm }