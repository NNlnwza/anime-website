// Dropbox base URL - เปลี่ยนเป็น URL ของคุณ
const DROPBOX_BASE_URL = "https://www.dropbox.com/scl/fo/7xa4hq3jifb1uzh7a7jmk/ACjptkAhSkq-dM4G2U9sd_w?rlkey=50oj3yjnq2kdnagq7bhwmqggx&st=s8fji51s&dl=0";

// แปลง Dropbox share URL เป็น direct download URL
function getDropboxDirectURL(path) {
    // ถ้าเป็น URL เต็มรูปแบบ ให้แปลงเป็น direct download URL
    if (path.includes('dropbox.com')) {
        return path.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
    }
    // ถ้าเป็นแค่ path ให้ใช้รูปแบบเดิม
    return `${DROPBOX_BASE_URL}/${path}?dl=1`;
}

const animeData = [
    {
        id: "danDaDan",
        title: "DanDaDan",
        type: "ซับไทย",
        description: "เรื่องราวของ Momo Ayase และ Ken Takakura สองนักเรียนมัธยมที่เชื่อในสิ่งที่แตกต่างกัน คนหนึ่งเชื่อเรื่องผีอีกคนเชื่อเรื่องUFO พวกเขาต้องมาร่วมมือกันต่อสู้กับเหตุการณ์เหนือธรรมชาติ",
        image: "images/dan.jpg",
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/uw2wgyz2zk7mafhrmys80/Dandadan_1.mp4?rlkey=dlg9zxqzc5g10ig8oameocw3f&st=e3kyekr2&dl=0")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/z6h3r5sm4vuwaj86fvhvn/Dandadan_2.mp4?rlkey=qp19n072t0v8a2eey2thb8z7f&st=4tuomhu4&dl=0")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/8emof56x1szujs5awu9ey/Dandadan_3.mp4?rlkey=gefdjdstncs141v7f12o45e7h&st=puer22jf&dl=0")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/wp7tjzqwl8b701xtjehth/Dandadan_4.mp4?rlkey=yj0nksgahneowvh8tmqmhnmtl&st=nkvt714u&dl=0")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/ygaakg674qa9ambjdec08/Dandadan_5.mp4?rlkey=2n6dl7ckrletc4tb92vzhwx05&st=ns9ozqvg&dl=0")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/zqvso0r86bw5ete8th03y/Dandadan_6.mp4?rlkey=vl9mpcq9g6h56rg3y5nen0p37&st=ez0ymxv4&dl=0")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/zo8kd9eyib98covao4ykr/Dandadan_7.mp4?rlkey=e1ym5d6e0uk2k8ssoeck8muwt&st=ly6cd0bm&dl=0")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/au80s48pyq5k1wci4zm11/Dandadan_8.mp4?rlkey=dfs833lgjnoadiape5m5v6t15&st=aoyckstd&dl=0")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/2he3yrap4lw8wofhs9tqf/Dandadan_9.mp4?rlkey=vz8duq3pjgd5eqccrizuqhwpe&st=l4tvefpn&dl=0")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/s1wb6hsok9vshyznre8nm/Dandadan_10.mp4?rlkey=o8bqmqvvpysu82u3ymdcacio0&st=iuye574c&dl=0")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/qw8rblh8zkvlz0blbghog/Dandadan_11.mp4?rlkey=ffo5a7ljjfuoy09f2hl4s7nla&st=3daji3ft&dl=0")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/s1jexywbb41jzfs0pg5tt/Dandadan_12.mp4?rlkey=69hmgjhxl9jvz6o209w99n858&st=m5yhiwxv&dl=0")
            }
        ]
    },
    {
        id: 'bluelock',
        title: 'Blue Lock',
        type: 'ซับไทย',
        description: 'โครงการคัดเลือกกองหน้าที่เห็นแก่ตัวที่สุดในประเทศญี่ปุ่น เพื่อสร้างกองหน้าระดับโลก ผู้แพ้จะถูกห้ามเป็นตัวแทนทีมชาติตลอดกาล',
        image: 'images/bluelock.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_1.mp4")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_2.mp4")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_3.mp4")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_4.mp4")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_5.mp4")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_6.mp4")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_7.mp4")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_8.mp4")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_9.mp4")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_10.mp4")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_11.mp4")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("Bluelock/Bluelock_12.mp4")
            }
        ]
    },
    {
        id: 'fireforce',
        title: 'Fire Force',
        type: 'ซับไทย',
        description: 'ในโลกที่ผู้คนถูกเปลี่ยนเป็นอสูรไฟอย่างไม่ทราบสาเหตุหน่วยดับเพลิงพิเศษถูกจัดตั้งขึ้นเพื่อต่อสู้กับภัยคุกคามนี้',
        image: 'images/fire.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_1.mp4")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_2.mp4")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_3.mp4")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_4.mp4")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_5.mp4")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_6.mp4")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_7.mp4")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_8.mp4")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_9.mp4")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_10.mp4")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_11.mp4")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("Fireforce/Fireforce_12.mp4")
            }
        ]
    },
    {
        id: 'sololeveling',
        title: 'Solo Leveling',
        type: 'ซับไทย',
        description: 'ซอง จินวู ฮันเตอร์ที่อ่อนแอที่สุดในโลก ได้รับพลังพิเศษที่ทำให้เขาสามารถเพิ่มระดับได้ไม่จำกัดเขาจึงออกเดินทางเพื่อกลายเป็นฮันเตอร์ที่แข็งแกร่งที่สุด',
        image: 'images/solo.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_1.mp4")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_2.mp4")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_3.mp4")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_4.mp4")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_5.mp4")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_6.mp4")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_7.mp4")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_8.mp4")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_9.mp4")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_10.mp4")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_11.mp4")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("Sololeveling/Sololeveling_12.mp4")
            }
        ]
    },
    {
        id: 'shangri-la',
        title: 'Shangri-La Frontier',
        type: 'ซับไทย',
        description: 'ซุนาโตะ ราคุโร่ ผู้เชี่ยวชาญในการเล่นเกมขยะ ได้เริ่มเล่นเกม VRMMO ชื่อดังอย่าง Shangri-La Frontier และต้องเผชิญกับความท้าทายมากมาย',
        image: 'images/Shan.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_1.mp4")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_2.mp4")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_3.mp4")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_4.mp4")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_5.mp4")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_6.mp4")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_7.mp4")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_8.mp4")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_9.mp4")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_10.mp4")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_11.mp4")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("Shangrila/Shangrila_12.mp4")
            }
        ]
    },
    {
        id: 'demon-slayer',
        title: 'Demon Slayer',
        type: 'ซับไทย',
        description: 'ทันจิโร่ คามาโดะ เด็กหนุ่มที่สูญเสียครอบครัวจากการถูกอสูรสังหาร และน้องสาวเนซึโกะถูกเปลี่ยนเป็นอสูร เขาจึงออกเดินทางเพื่อกลายเป็นนักล่าอสูรและหาทางรักษาน้องสาว',
        image: 'images/demon.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_1.mp4")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_2.mp4")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_3.mp4")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_4.mp4")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_5.mp4")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_6.mp4")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_7.mp4")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_8.mp4")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_9.mp4")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_10.mp4")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_11.mp4")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("Demonslayer/Demonslayer_12.mp4")
            }
        ]
    },
    {
        id: 'kaiju-no-8',
        title: 'Kaiju No.8',
        type: 'ซับไทย',
        description: 'คาฟกะ ฮิบิโนะ ชายผู้ทำงานกำจัดซากไคจู มีความฝันที่จะเข้าร่วมกองกำลังป้องกัน แต่ชีวิตของเขาเปลี่ยนไปเมื่อได้รับพลังลึกลับที่ทำให้กลายเป็นไคจูได้',
        image: 'images/kaiju.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/j0vj8onkxysh737k88gcc/Kaijuu_1.mp4?rlkey=w7h5dzuc7bivj950m080pvl59&st=07mwuatj&dl=0")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/p30uev3ax2dijurhg2fgb/Kaijuu_2.mp4?rlkey=njez28osf8y7hy16jpetkyqsx&st=q0cs5dl6&dl=0")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/pjf2yttnjoomeq7i3j85m/Kaijuu_3.mp4?rlkey=cknng155pu24rguu848uhaoss&st=0b9az4nq&dl=0")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/goyuuuuzdvje9cmtxsuhd/Kaijuu_4.mp4?rlkey=r3wqu744eqcyh2ec6orvqp5py&st=66c4nj2p&dl=0")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/emnh1grie36z75oisuxlk/Kaijuu_5.mp4?rlkey=k55lv1sqbppvqlbieyiettx6s&st=1tn1s4hm&dl=0")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/umke3lu59lghv7msfuqn4/Kaijuu_6.mp4?rlkey=6hw13kbv4vyslc0qrrfyt3977&st=kv5dsxvm&dl=0")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/9hmw7hjx1cmyufbtvg8vb/Kaijuu_7.mp4?rlkey=xcr3l1d8wdul6nii56brg1213&st=amfenmzj&dl=0")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/koy48zcf9cawkxdlyob7z/Kaijuu_8.mp4?rlkey=04p22crqnvt04xydgwqa52g2o&st=y22df084&dl=0")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/9616ps59b2nbq8xqe2yzp/Kaijuu_9.mp4?rlkey=nd3cqeh8y26yox92yc3g904w8&st=kknoccy8&dl=0")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/1awzx8qs0nzpy859pt8gs/Kaijuu_10.mp4?rlkey=ist1jsnyjav332f7x54rsq3ep&st=ykfxmmj5&dl=0")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/pyjezlp00b05tbz0yewss/Kaijuu_11.mp4?rlkey=jt8bvw3crygtxwcbstrrrzvg5&st=1tuo8rpt&dl=0")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/1qcu1gb2jkpafdkq3oqd8/Kaijuu_12.mp4?rlkey=82s2bgaz5c59vungsqk4rnwhq&st=sfvx8nwv&dl=0")
            }
        ]
    },
    {
        id: 'fairy-tail',
        title: 'Fairy Tail',
        type: 'ซับไทย',
        description: 'การผจญภัยของนัตสึและลูซี่ในกิลด์เวทมนตร์ Fairy Tail พวกเขาต้องเผชิญกับศัตรูที่แข็งแกร่ง ปกป้องเพื่อน และค้นหาความลับของมังกรที่หายไป',
        image: 'images/fariy.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_1.mp4")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_2.mp4")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_3.mp4")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_4.mp4")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_5.mp4")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_6.mp4")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_7.mp4")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_8.mp4")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_9.mp4")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_10.mp4")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_11.mp4")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("Fairytail/Fairytail_12.mp4")
            }
        ]
    },
    {
        id: 'blue-exorcist',
        title: 'Blue Exorcist',
        type: 'ซับไทย',
        description: 'ริน โอคุมุระ เด็กหนุ่มที่ค้นพบว่าตัวเองเป็นลูกของซาตาน เขาตัดสินใจเข้าเรียนในโรงเรียนนักปราบปีศาจเพื่อต่อสู้กับปีศาจและพิสูจน์ตัวเอง',
        image: 'images/blue.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_1.mp4")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_2.mp4")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_3.mp4")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_4.mp4")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_5.mp4")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_6.mp4")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_7.mp4")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_8.mp4")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_9.mp4")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_10.mp4")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_11.mp4")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("Blueexorcist/Blueexorcist_12.mp4")
            }
        ]
    },
    {
        id: 'sakamoto-days',
        title: 'Sakamoto Days',
        type: 'ซับไทย',
        description: 'ทาโร่ ซากาโมโต้ อดีตมือสังหารระดับตำนานที่ผันตัวมาเป็นเจ้าของร้านสะดวกซื้อและมีครอบครัว แต่อดีตของเขาก็ยังคงตามมาหลอกหลอน',
        image: 'images/sa.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_1.mp4")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_2.mp4")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_3.mp4")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_4.mp4")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_5.mp4")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_6.mp4")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_7.mp4")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_8.mp4")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_9.mp4")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_10.mp4")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_11.mp4")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("Sakamotodays/Sakamotodays_12.mp4")
            }
        ]
    },
    {
        id: 'lazarus',
        title: 'Lazarus',
        type: 'ซับไทย',
        description: 'ในปียูโทเปียปี 2052 ดร.สกินเนอร์ได้ค้นพบยาแก้สรรพโรค ในปี 2055 สกินเนอร์ประกาศว่ายาชนิดนี้มีครึ่งชีวิตสามปี และอีกไม่นานทุกคนที่ใช้ยาชนิดนี้จะต้องเสียชีวิต',
        image: 'images/la.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/e3kjwmuk1kqu3l31gbp5p/Lazarus_1.mp4?rlkey=8vfonbqk7739seyqjg6ybrbmo&st=spgod1kr&dl=0")
            }
        ]
    },
    {
        id: 'mashle',
        title: 'Mashle',
        type: 'ซับไทย',
        description: 'ในโลกที่เวทมนตร์คือทุกสิ่ง มาช เบิร์นเนอร์ เด็กหนุ่มที่เกิดมาโดยไม่มีพลังเวทมนตร์ แต่มีพละกำลังมหาศาล ต้องเข้าเรียนในโรงเรียนเวทมนตร์เพื่อปกป้องตัวเองและครอบครัว',
        image: 'images/mashle.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_1.mp4")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_2.mp4")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_3.mp4")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_4.mp4")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_5.mp4")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_6.mp4")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_7.mp4")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_8.mp4")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_9.mp4")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_10.mp4")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_11.mp4")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("Mashle/Mashle_12.mp4")
            }
        ]
    },
    {
        id: 'classroom-of-elite',
        title: 'Classroom of the Elite',
        type: 'ซับไทย',
        description: 'โรงเรียนมัธยมปลายโคโด อิคุเซย์ สถาบันที่รับประกันการเข้ามหาวิทยาลัยและการได้งาน 100% แต่ความจริงแล้วมีเพียงนักเรียนชั้น A เท่านั้นที่ได้รับสิทธิพิเศษ ส่วนชั้น D ที่อายาโนโคจิอยู่กลับถูกดูถูกว่าเป็นเศษขยะ',
        image: 'images/classroom.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_1.mp4")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_2.mp4")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_3.mp4")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_4.mp4")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_5.mp4")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_6.mp4")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_7.mp4")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_8.mp4")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_9.mp4")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_10.mp4")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_11.mp4")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("Classroom/Classroom_12.mp4")
            }
        ]
    },
    {
        id: 'jujutsu-kaisen',
        title: 'Jujutsu Kaisen',
        type: 'ซับไทย',
        description: 'อิตาโดริ ยูจิ นักเรียนมัธยมปลายที่มีพละกำลังเหนือมนุษย์ วันหนึ่งเขาได้กลืนนิ้วต้องคำสาปของสุคุนะเข้าไปเพื่อช่วยเพื่อน ทำให้เขาต้องเข้าร่วมกับโรงเรียนไสยเวท เพื่อตามหานิ้วที่เหลือของสุคุนะ',
        image: 'images/jujutsu.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_1.mp4")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_2.mp4")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_3.mp4")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_4.mp4")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_5.mp4")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_6.mp4")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_7.mp4")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_8.mp4")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_9.mp4")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_10.mp4")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_11.mp4")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("Jujutsukaisen/Jujutsukaisen_12.mp4")
            }
        ]
    },
    {
        id: 'blue-box',
        title: 'Blue Box',
        type: 'ซับไทย',
        description: 'ทกิ นักเรียนมัธยมต้นที่แอบชอบรุ่นพี่สาว ชินัตสึ นักบาสสาวดาวเด่น ทั้งสองต้องมาอยู่บ้านเดียวกัน ทำให้ความสัมพันธ์ค่อยๆ พัฒนา ท่ามกลางความฝันและการแข่งขันกีฬา.',
        image: 'images/box.jpg',
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/sy1k3y8wvy0jx7jtl178m/1-Anime-Sugoi-Anime.mp4?rlkey=axg4pns8rpub0okzvb14l054r&st=de1r9vn5&dl=0")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/nfq3nb62f3ye3uqnaid8m/2-Anime-Sugoi-Anime.mp4?rlkey=bn34zrgfa3fktpbngxnngjf9k&st=pa9rxmus&dl=0")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/ko8r530u5wrepaq9mdo5y/3-Anime-Sugoi-Anime.mp4?rlkey=iqyn4rcqbyztq8mh8tuf2pr1t&st=nrvps1o0&dl=0")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/449h8nyjv4c7ke5gvwz63/4-Anime-Sugoi-Anime.mp4?rlkey=twh52tr0irmxvejhvq70i9wz5&st=4f8rf9od&dl=0")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/yfs6it8jrv3t6dex2wei2/5-Anime-Sugoi-Anime.mp4?rlkey=xp9ay6mvdx2x05sxsideyj0gk&st=sn28g79c&dl=0")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/hsshjyqbjmzbhvtg6kvlk/6-Anime-Sugoi-Anime.mp4?rlkey=jvng2rjmosur98uoc74al2s8y&st=17qavfhg&dl=0")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/nbwnmyxce6j4puy1isd68/7-Anime-Sugoi-Anime.mp4?rlkey=30xu5z0n2louqiap93zabug5z&st=0367eher&dl=0")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/2t2esxoo26ti4ue5qskzh/8-Anime-Sugoi-Anime.mp4?rlkey=0cskuc3idxostz3rp8fq5vvlx&st=k6qqia1u&dl=0")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/t0deqvqabug1p5qyvwnnz/9-Anime-Sugoi-Anime.mp4?rlkey=iemndttmszlfmt38spw5xz03v&st=8iq16vek&dl=0")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/970qil22tutr8ebv0nn28/10-Anime-Sugoi-Anime.mp4?rlkey=14e2aeztw8qi5vhzecskuecaz&st=xggilk0m&dl=0")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/0nfaz7cx73ffuf15dddru/11-Anime-Sugoi-Anime.mp4?rlkey=zalboq1c9ul0nh5tal5xyxact&st=t7q4ihlk&dl=0")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/ir025pl81118g8dp22b77/12-Anime-Sugoi-Anime.mp4?rlkey=vvdfds57bfvygn2m8i2nulpkv&st=3td95ju4&dl=0")
            },
            {
                number: 13,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/ydzympk3o3aq6m5cnm4jb/13-Anime-Sugoi-Anime.mp4?rlkey=dbxpz437xzqb8kggxdhkduugg&st=q0q8bqc3&dl=0")
            },
            {
                number: 14,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/7alc8tjpvc5euh7fock3z/14-Anime-Sugoi-Anime.mp4?rlkey=b31r2isv8a0wmono29m03tgtl&st=kt9vxqji&dl=0")
            },
            {
                number: 15,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/9hlim3l2yq3xh3jm7bdjm/15-Anime-Sugoi-Anime.mp4?rlkey=lzntoemuda28a3qq82ae8hfqv&st=ni5yi79t&dl=0")
            },
            {
                number: 16,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/tifktjyfw99jaqyekclsa/16-Anime-Sugoi-Anime.mp4?rlkey=g7evb20291f44ws2h2mz0ym2a&st=vhzzyrp3&dl=0")
            },
            {
                number: 17,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/67lrgv6gmpq5by75v17rd/17-Anime-Sugoi-Anime.mp4?rlkey=otyz130oatawt290qsaq5ma9m&st=bdykbwgq&dl=0")
            },
            {
                number: 18,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/l586uh7xq10fb6rm7x9xi/18-Anime-Sugoi-Anime.mp4?rlkey=buwrolp11z2ql4aqgdvp4837p&st=mtdaovmm&dl=0")
            },
            {
                number: 19,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/9tt88aajs6ouvod70ensl/19-Anime-Sugoi-Anime.mp4?rlkey=9rp2dioxedtgjol5xcyfzoga1&st=luo82kz3&dl=0")
            },
            {
                number: 20,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/6takx60iys006d3cvh86s/20-Anime-Sugoi-Anime.mp4?rlkey=11m5wlpbbp2srtjkzcu05owrd&st=0eqi9217&dl=0")
            },
            {
                number: 21,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/r17xjain2fm3rp7p4mui7/21-Anime-Sugoi-Anime.mp4?rlkey=jmmwz40ezz74xpczur2evhu17&st=w3xi6tl7&dl=0")
            },
            {
                number: 22,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/2yv2bypjri3mrepl1rddg/22-Anime-Sugoi-Anime.mp4?rlkey=ymqq7attt23iywki7m5xsjrjo&st=rwmtbvon&dl=0")
            },
            {
                number: 23,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/cowdoqu4cepq81fnx82fo/23-Anime-Sugoi-Anime.mp4?rlkey=swbqpxjl9hskhf0ce7gyr3nsb&st=ud6p1q29&dl=0")
            },
            {
                number: 24,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/u89m6i5966mg1rn99rdp1/24-Anime-Sugoi-Anime.mp4?rlkey=dzxblacp5puvu80w66onrgexi&st=ayrxozg9&dl=0")
            },
            {
                number: 25,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/c5y9nqj22o8v85bsj1iyy/25-Anime-Sugoi-Anime.mp4?rlkey=huh9k0hvw7s474jwqrzkx7qse&st=x1xq56ij&dl=0")
            }
        ]
    }
]; 