
// ตัวแปรเก็บคะแนนของแต่ละหมวด
let scores = {
    respiratory: 0,
    oxygen: 0,
    supp_oxygen: 0,
    temperature: 0,
    bp: 0,
    heart_rate: 0,
    avpu: 0
};

// ฟังก์ชันเลือกตัวเลือกและกำหนดคะแนน
function selectOption(category, value, button) {
    // ลบคลาส selected จากทุกปุ่มในหมวดเดียวกัน
    let buttons = document.getElementById(category).getElementsByTagName("button");
    for (let btn of buttons) {
        btn.classList.remove("selected");
    }

    // กำหนดคะแนนและเพิ่มคลาส selected ให้ปุ่มที่เลือก
    scores[category] = value;
    button.classList.add("selected");

    // อัพเดทคะแนนรวม
    updateScore();
}

// ฟังก์ชันตรวจสอบว่ามีคะแนน 3 ในหมวดใดบ้าง
function checkRedScores() {
    let redCategories = [];
    for (let category in scores) {
        if (scores[category] === 3) {
            redCategories.push(category);
        }
    }
    return redCategories;
}

// ฟังก์ชันแปลง category เป็นข้อความภาษาไทย
function getCategoryName(category) {
    const categoryNames = {
        'respiratory': 'อัตราการหายใจ',
        'oxygen': 'ความอิ่มตัวของออกซิเจน',
        'supp_oxygen': 'การใช้ออกซิเจนเสริม',
        'temperature': 'อุณหภูมิ',
        'bp': 'ความดันโลหิต',
        'heart_rate': 'อัตราการเต้นของหัวใจ',
        'avpu': 'ระดับความรู้สึกตัว'
    };
    return categoryNames[category] || category;
}

// ฟังก์ชันคำนวณคะแนนรวม
function updateScore() {
    // รวมคะแนนทั้งหมด
    let totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    document.getElementById("totalScore").innerText = totalScore;
    
    // ตรวจสอบ RED score
    let redCategories = checkRedScores();
    
    // แสดงคำแนะนำตามระดับคะแนน
    updateAdvice(totalScore, redCategories);
}

// ฟังก์ชันแสดงคำแนะนำตามระดับคะแนน
function updateAdvice(score, redCategories) {
    let advice = "";
    let hasRedScore = redCategories.length > 0;
    
    // สร้างข้อความแสดงรายการหมวดที่ได้คะแนน 3
    let redScoreText = "";
    if (hasRedScore) {
        redScoreText = "<div class='red-score-alert'>⚠️ พบ RED score ในหมวด: ";
        redScoreText += redCategories.map(cat => getCategoryName(cat)).join(", ");
        redScoreText += "<br>ต้องให้การติดตามอาการอย่างใกล้ชิด เนื่องจากผู้ป่วยมีอาการเปลี่ยนแปลงมาก</div>";
    }
    
    // เปลี่ยนสีของคะแนนรวมตามระดับคะแนน
    const totalScoreElement = document.getElementById("totalScore");
    
    if (score === 0) {
        totalScoreElement.style.color = "#2e7d32"; // สีเขียว
    } else if (score >= 1 && score <= 4) {
        totalScoreElement.style.color = "#2e7d32"; // สีเขียว
    } else if (score >= 5 && score <= 6) {
        totalScoreElement.style.color = "#ff8f00"; // สีส้ม
    } else if (score >= 7) {
        totalScoreElement.style.color = "#c53030"; // สีแดง
    }
    
    if (score >= 0 && score <= 4) {
        advice = "คะแนนต่ำ : ให้การพยาบาล Basic ตรวจสอบอาการทั่วไป";
        document.getElementById("advice").style.color = hasRedScore ? "#c53030" : "#2e7d32"; // สีแดงเข้มหรือเขียว
    } else if (score >= 5 && score <= 6) {
        advice = "คะแนนปานกลาง : เร่งด่วน แจ้งพยาบาลเพื่อประเมินอาการซ้ำเพื่อให้การพยาบาลได้อย่างทันท่วงที";
        document.getElementById("advice").style.color = "#ff8f00"; // สีส้ม
    } else if (score >= 7) {
        advice = "คะแนนสูง : ฉุกเฉิน แจ้งทีมแพทย์เพื่อส่งต่อผู้ป่วยให้ได้รับการดูแลขั้นวิกฤต";
        document.getElementById("advice").style.color = "#c53030"; // สีแดง
    }
    
    document.getElementById("advice").innerHTML = advice + (hasRedScore ? "<br><br>" + redScoreText : "");
}

// ฟังก์ชันรีเซ็ตคะแนนทั้งหมด
function resetScores() {
    // รีเซ็ตคะแนนทุกหมวด
    scores = {
        respiratory: 0,
        oxygen: 0,
        supp_oxygen: 0,
        temperature: 0,
        bp: 0,
        heart_rate: 0,
        avpu: 0
    };
    
    // ลบ class selected จากทุกปุ่ม
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.classList.remove('selected');
    });
    
    // อัพเดทคะแนนรวม
    updateScore();
    
    // ล้างข้อความคำแนะนำ
    document.getElementById('advice').innerHTML = '';
}

// เพิ่ม DOMContentLoaded เพื่อให้แน่ใจว่าสคริปต์ทำงานหลังจาก DOM โหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
    // รีเซ็ตคะแนนเมื่อโหลดหน้า
    resetScores();
});
