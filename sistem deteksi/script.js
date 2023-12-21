let penyakit = {
	hiv: 'HIV AIDS',
	herpes: 'Herpes',
	chlamydia: 'Chlamydia'
}
let gejala = {
	G01: 'Melakukan Hubungan Seksual Tanpa Pengaman',
	G02: 'Memiliki Riwayat Kontak Dengan Penderita HIV AIDS',
	G03: 'Mengalami Luka Terbuka atau Melepuh di Daerah Genital',
	G04: 'Mengalami Keluarnya Cairan Abnormal'
}
function tampilkanpertanyaan(){
	let pertanyaanForm = document.getElementById('daftarpertanyaan');
    for (let kodeGejala in gejala) {
      let pertanyaanFieldset = document.createElement('fieldset');
      let legend = document.createElement('legend');
      legend.textContent = gejala[kodeGejala];
      pertanyaanFieldset.appendChild(legend);

      let labelYa = document.createElement('label');
      labelYa.innerHTML = '<input type="radio" name="' + kodeGejala + '" value="ya"> Ya';
      pertanyaanFieldset.appendChild(labelYa);

      let labelTidak = document.createElement('label');
      labelTidak.innerHTML = '<input type="radio" name="' + kodeGejala + '" value="tidak"> Tidak';
      pertanyaanFieldset.appendChild(labelTidak);

      pertanyaanForm.appendChild(pertanyaanFieldset);
    }
    let btn = document.getElementById('submitbtn');
    pertanyaanForm.appendChild(btn);
}
tampilkanpertanyaan();
function deteksi(data){
	let rules = [
	  {
	    conditions: {
	      G01: 'ya',
	      G02: 'ya',
	      G03: 'ya',
	      G04: 'ya'
	    },
	    action: 'Rule 1: Anda memiliki risiko tinggi terkena HIV/AIDS. Segera berkonsultasi dengan dokter.'
	  },
	  {
	    conditions: {
	      G01: 'ya',
	      G02: 'ya',
	      G03: 'tidak',
	      G04: 'tidak'
	    },
	    action: 'Rule 2: Anda memiliki risiko rendah terkena HIV/AIDS. Tetap waspada dan lakukan pemeriksaan rutin.'
	  },
	  {
	    conditions: {
	      G01: 'tidak',
	      G02: 'ya',
	      G03: 'tidak',
	      G04: 'tidak'
	    },
	    action: 'Rule 3: Anda memiliki risiko rendah terkena HIV/AIDS. Tetap waspada dan lakukan pemeriksaan rutin.'
	  },
	  {
	    conditions: {
	      G01: 'tidak',
	      G02: 'tidak',
	      G03: 'ya',
	      G04: 'tidak'
	    },
	    action: 'Rule 4: Anda mungkin mengalami masalah kesehatan lainnya. Segera periksakan diri ke dokter.'
	  },
	  {
	    conditions: {
	      G01: 'tidak',
	      G02: 'tidak',
	      G03: 'tidak',
	      G04: 'ya'
	    },
	    action: 'Rule 5: Anda mungkin mengalami masalah kesehatan lainnya. Segera periksakan diri ke dokter.'
	  },
	  {
	    conditions: {
	      G01: 'tidak',
	      G02: 'tidak',
	      G03: 'tidak',
	      G04: 'tidak'
	    },
	    action: 'Rule 6: Tidak ada gejala yang mencurigakan. Tetap jaga kesehatan dan lakukan pemeriksaan rutin.'
	  }
	];
	for (let i = 0; i < rules.length; i++) {
	    let rule = rules[i];
	    let conditionsMet = true;
	    for (let gejala in rule.conditions) {
	      if (data[gejala] !== rule.conditions[gejala]) {
	        conditionsMet = false;
	        break;
	      }
	    }
	    if(conditionsMet) {
	      alert(rule.action);
	      break;
	    }
	}
}
function getData(event) {
      let form = document.getElementById('daftarpertanyaan');
      let data = {};
      let inputs = form.elements;
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'radio' && inputs[i].checked) {
          data[inputs[i].name] = inputs[i].value;
        }
      }
      return data;
    }
document.getElementById('submitbtn').addEventListener('click', function (event){
	event.preventDefault();
	deteksi(getData());
})