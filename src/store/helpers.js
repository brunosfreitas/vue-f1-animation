export default function getConstructorExtraInfo(constructorId){
    switch(constructorId){
        case 'mercedes':
            return {
                color: '#00D2BE',
                carImage: 'https://www.formula1.com/content/dam/fom-website/teams/2020/mercedes.png'
            };
        case 'red_bull': 
            return {
                color: '#0600ef',
                carImage: 'https://www.formula1.com/content/dam/fom-website/teams/2020/red-bull-racing.png'
            };
        case 'racing_point':
            return {
                color: '#F596C8',
                carImage: 'https://www.formula1.com/content/dam/fom-website/teams/2020/racing-point.png'
            };
        case 'ferrari': 
            return {
                color: '#DC0000',
                carImage: 'https://www.formula1.com/content/dam/fom-website/teams/2020/ferrari.png'
            };
        case 'renault':
            return {
                color: '#FFF500',
                carImage: 'https://www.formula1.com/content/dam/fom-website/teams/2020/renault.png'
            };
        case 'mclaren': 
            return {
                color: '#FF8700',
                carImage: 'https://www.formula1.com/content/dam/fom-website/teams/2020/mclaren.png'
            };
        case 'alphatauri': 
            return {
                color: '#ffffff',
                carImage: 'https://www.formula1.com/content/dam/fom-website/teams/2020/alphatauri.png'
            };
        case 'alfa': 
            return {
                color: '#960000',
                carImage: 'https://www.formula1.com/content/dam/fom-website/teams/2020/alfa-romeo-racing.png'
            };
        case 'haas': 
            return {
                color: '#787878',
                carImage: 'https://www.formula1.com/content/dam/fom-website/teams/2020/haas-f1-team.png'
            };
        case 'williams':
            return {
                color: '#0082fa',
                carImage: 'https://www.formula1.com/content/dam/fom-website/teams/2020/williams.png'
            };
        default:
            return {
                color: '#000000',
                carImage: ''
            };
    }   
}