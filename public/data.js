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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/5a0n9x84lij0w1dnrlszw/Dandadan-Official-Trailer.mp4?rlkey=406qpycl108r45nnvmt75i66m&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/muzhn85g2tp84rap55y9k/Blue-Lock-_-Official-Trailer.mp4?rlkey=m1kqljrg7o6a3iorhkj6nb2i1&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/o8bv86eiyp64ldj1ljp2r/Fire-Force-OFFICIAL-PREVIEW.mp4?rlkey=ckjc1bw8t4r4sto2wmzrzfm82&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/zdu2e4www60s1xreisiw8/Solo-Leveling-OFFICIAL-TRAILER.mp4?rlkey=dgergsco41kyc9paf31xhwjoc&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/7m5a9rvhqptuhrq9g0xwl/Shangri-la-Frontier-_-OFFICIAL-TRAILER-3.mp4?rlkey=iy0so28vvoqy44k0d9h51dfd4&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/742s6ykzbvmsqdaq5h263/Demon-Slayer_-Kimetsu-no-Yaiba-Trailer-1.mp4?rlkey=wulrg4ughjk0qmcqk3n1xc5tb&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/354kxqdts5d7el03ciw0d/KAIJU-NO.8-Official-Main-Trailer.mp4?rlkey=s3ismmfkzp8940tu5fs0xwaux&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/6d6ei4mn6eky797m0wj9j/PV-FAIRY-TAIL-100-7-7-5-30-6.mp4?rlkey=4qgspitexq5w8xer6vau2l5s6&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/jjdyzp2vic55sq212vfve/Blue-Exorcist-Shimane-Illuminati-Saga-_-OFFICIAL-TRAILER.mp4?rlkey=4rzaodaupr3h677meoyw53u73&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/6d6ei4mn6eky797m0wj9j/PV-FAIRY-TAIL-100-7-7-5-30-6.mp4?rlkey=4qgspitexq5w8xer6vau2l5s6&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/kpp8xztft2afgrdubw8vk/LAZARUS-PV-_LAZARUS_-Main-Trailer.mp4?rlkey=utwo4okygjgipngrn7vkrfnmi&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/efnfy0isego65c0gr5w6e/MASHLE-MAGIC-AND-MUSCLES-Main-Trailer.mp4?rlkey=7jd3ybq4s8ryjfpox934bbdax&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/dt6xneiw29k9ptetjcxbu/TV-5.mp4?rlkey=u37o2jk9s4lquc3rev9dfqrej&dl=0"),
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
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/91dtzb2ztn136lap8dk64/JUJUTSU-KAISEN-OFFICIAL-TRAILER.mp4?rlkey=ctp708nahzdopzat6z137uacd&dl=0"),
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
        description: 'ไทกิ นักเรียนมัธยมต้นที่แอบชอบรุ่นพี่สาว ชินัตสึ นักบาสสาวดาวเด่น ทั้งสองต้องมาอยู่บ้านเดียวกัน ทำให้ความสัมพันธ์ค่อยๆ พัฒนา ท่ามกลางความฝันและการแข่งขันกีฬา.',
        image: 'images/box.jpg',
        trailerUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/l329cauolla6o8o227q0r/Bluebox-Netflix.mp4?rlkey=kraxd9crhqo1ua4hj7mqrr20z&dl=0"),
        episodes: [
            {
                number: 1,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/erg877vckd8yyyvjt6uls/ALL-IN-ONE-Ao-no-Hako-01-1080p.mp4?rlkey=chsqb5q1v3etyk07ktchg3gsq&st=h0mjpf3y&dl=0")
            },
            {
                number: 2,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/z44wiy50zrwc9xce8y67f/ALL-IN-ONE-Ao-no-Hako-02-1080p-.mp4.mp4?rlkey=or5b8shaw0315yn04b3758rvw&st=xdbtnaxu&dl=0")
            },
            {
                number: 3,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/wvrtv0wxlgxx8yv51rmys/ALL-IN-ONE-Ao-no-Hako-03-1080p.mp4?rlkey=cwjhcmvylsgcdiss2ups5sq9m&st=1t7514sh&dl=0")
            },
            {
                number: 4,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/xjmttq6tw4q24ej04rki6/ALL-IN-ONE-Ao-no-Hako-04-1080p.mp4?rlkey=dvvpo2mcw6aeg9y6xq483adcw&st=luc0bmh8&dl=0")
            },
            {
                number: 5,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/ig1tv92x0tbt1ynag6hbo/ALL-IN-ONE-Ao-no-Hako-05-1080p-.mp4.mp4?rlkey=o0sn7c5rw6d7w7ok1ppbtefe4&st=y0tp8kth&dl=0")
            },
            {
                number: 6,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/rq1czm4lqkljfr6vp74z0/ALL-IN-ONE-Ao-no-Hako-06-1080p-.mp4.mp4?rlkey=olxpdyxoq4sioyj1cmbdgve25&st=o0dtq5cy&dl=0")
            },
            {
                number: 7,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/089xov5en9714lt6w7yvs/ALL-IN-ONE-Ao-no-Hako-07-1080p-.mp4.mp4?rlkey=al2qpu91joy69zamuh2a1x6j6&st=1n4oodoz&dl=0")
            },
            {
                number: 8,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/0wu9kgh32pxgp3zzj61nj/ALL-IN-ONE-Ao-no-Hako-08-1080p-.mp4.mp4?rlkey=wj6kwsfxhg8qo1tdnps2r9ssc&st=tsg1ya1e&dl=0")
            },
            {
                number: 9,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/uugn6c5fjwflmpx66h4x9/ALL-IN-ONE-Ao-no-Hako-09-1080p.mp4?rlkey=lu1fjifktqdc655dlxpiklm43&st=am6kwb86&dl=0")
            },
            {
                number: 10,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/8cdv3y66e3wxgag7jnm9h/ALL-IN-ONE-Ao-no-Hako-10-1080p.mp4?rlkey=ed1pppu4a2mtcx4g03iyqi8p1&st=vhdrrvul&dl=0")
            },
            {
                number: 11,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/hcd2vg0rquitghghy34hj/ALL-IN-ONE-Ao-no-Hako-11-1080p-.mp4.mp4?rlkey=96a2lahzvtirv2jk602eazcbr&st=16gso7vc&dl=0")
            },
            {
                number: 12,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/hdroji5e4w4a0wtfptnnr/ALL-IN-ONE-Ao-no-Hako-12-1080p-.mp4.mp4?rlkey=6ni381zei05cf25jeunr75816&st=63hr211r&dl=0")
            },
            {
                number: 13,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/1mhkrltfqwu1h1o5ntbp1/ALL-IN-ONE-Ao-no-Hako-13-1080p-.mp4.mp4?rlkey=2d3roc6gmvlvmt1e7jjx0yt8e&st=xysx2sz7&dl=0")
            },
            {
                number: 14,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/2ha3tomvm5l9bb3lksm85/ALL-IN-ONE-Ao-no-Hako-14-1080p-.mp4.mp4?rlkey=s1dvsh1ap1804tfve2a4bpgxh&st=ufikhi5h&dl=0")
            },
            {
                number: 15,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/yazk7sk3gj3cb0018ydic/ALL-IN-ONE-Ao-no-Hako-15-1080p-.mp4.mp4?rlkey=0uenmtyh4bmnd5pej966lx2nx&st=7i5jg2p3&dl=0")
            },
            {
                number: 16,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/lw5gx420lqqkkqs6craa4/ALL-IN-ONE-Ao-no-Hako-16-1080p-.mp4.mp4?rlkey=f2o1ff8lyup2joqq65ozpomud&st=pg1y7zcu&dl=0")
            },
            {
                number: 17,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/er1gx2x1j6dri1xswastv/ALL-IN-ONE-Ao-no-Hako-17-1080p-.mp4.mp4?rlkey=bqehxfwp0o3yp0mcjyiywqnai&st=27zw7t4h&dl=0")
            },
            {
                number: 18,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/puwgxdyrvix2rudecdz8c/ALL-IN-ONE-Ao-no-Hako-18-1080p-.mp4.mp4?rlkey=hn3p1abxoy214q2yxoobv4crd&st=e3c6ue8q&dl=0")
            },
            {
                number: 19,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/qfmtwjzk5gvn9v1jmmlro/ALL-IN-ONE-Ao-no-Hako-19-1080p-.mp4.mp4?rlkey=w88b0jly0hj0i3zgv3d6cv9yd&st=14h9trqi&dl=0")
            },
            {
                number: 20,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/bjnnpxdw7sp6wmk0n41ic/ALL-IN-ONE-Ao-no-Hako-20-1080p-.mp4.mp4?rlkey=vevmlhtardoo07qbql9kn3wjh&st=7smcq0iq&dl=0")
            },
            {
                number: 21,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/2wt89vi7agy6e5aoudpax/ALL-IN-ONE-Ao-no-Hako-21-1080p.mp4?rlkey=exole43g6q6r3365tp4nu2za8&st=l9l6btnh&dl=0")
            },
            {
                number: 22,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/al3qvh0otkr5r18u5o8ev/ALL-IN-ONE-Ao-no-Hako-22-1080p.mp4?rlkey=3sd2up000bgvo9gusnripzljo&st=g14rfhhk&dl=0")
            },
            {
                number: 23,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/cc3v8b0loycsxhrb0k98f/ALL-IN-ONE-Ao-no-Hako-23-1080p.mp4?rlkey=4yol84hajyp947c7ha6jmfjs8&st=ooh30dr2&dl=0")
            },
            {
                number: 24,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/f8msq96xcoy3syncpahx6/ALL-IN-ONE-Ao-no-Hako-24-1080p.mp4?rlkey=xxzlskr529bb222bnfnxvjcav&st=7bj1xqm7&dl=0")
            },
            {
                number: 25,
                videoUrl: getDropboxDirectURL("https://www.dropbox.com/scl/fi/ck26n50eabihr3wklkmdt/ALL-IN-ONE-Ao-no-Hako-25-END-1080p.mp4?rlkey=yek1c637jkmnkjc7olvlb4fk7&st=nc8giwvx&dl=0")
            }
        ]
    }
]; 