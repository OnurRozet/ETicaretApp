const mongoose = require('mongoose');

const uri = "mongodb+srv://ETicaretApp:Qazxsw123@eticaretapp.tkzxtey.mongodb.net/?retryWrites=true&w=majority&appName=ETicaretApp";

const connection= () => mongoose.connect(uri, {
})
.then(() => console.log('MongoDB bağlantısı başarılı'))
.catch(err => console.error('MongoDB bağlantısı hatası:', err));


module.exports = connection;