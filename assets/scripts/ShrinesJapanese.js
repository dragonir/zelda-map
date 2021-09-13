var AllJapaneseShrines = (function () {
  var shrines = "マ・オーヌの祠|ジャ・バシフの祠|ワ・モダイの祠|トゥミ・ンケの祠|ヴァシ・リャコの祠|モンヤ・トマの祠|シ・ダゴズの祠|ルヨ・タウの祠|ワゴ・カタの祠|ヤカー・マタの祠|ダ・カソーの祠|カタ・チュキの祠|ナミカ・オズの祠|ニア・ネアの祠|サス・コサの祠|キワ・ザタスの祠|シャオ・ヨの祠|モ・ラタニアの祠|マ・ノラの祠|トー・ヤッサの祠|ミッダ・ロキの祠|キヨ・ウーの祠|クン・シダジの祠|ダ・チョカヒの祠|マーム・ラノの祠|キト・ワワイの祠|リ・ダヒの祠|ヒロ・ヒラの祠|ハユ・ダマの祠|タロ・ニヒの祠|サイ・ウートの祠|シベ・ニャスの祠|シベ・ニーロの祠|トト・イサの祠|ショダ・サーの祠|ラーナ・ロキの祠|キュカ・ナタの祠|ミャマ・ガナの祠|ヤオ・マーヨの祠|ムオ・ジームの祠|ダウ・ナエの祠|タワ・ジヌの祠|カム・ユオの祠|チャス・ケタの祠|クグ・チデの祠|マ・カヤの祠|ミーズー・ヨの祠|ターノ・アの祠|ジター・サミの祠|ダタ・クスの祠|サオ・コヒの祠|カヤ・ミワの祠|シェモ・ラタの祠|ネヅ・ヨマの祠|ダ・キキーの祠|ルッコ・マの祠|シ・ヨタの祠|ジノ・ヨーの祠|ケー・ノイの祠|キマ・コササの祠|ササ・カイの祠|キハ・ウの祠|ディラ・マの祠|イオ・ソオの祠|シ・ジトの祠|クイ・タッカの祠|スマ・サマの祠|ジュニ・シの祠|グコ・チセの祠|ハワ・カイの祠|ト・カユーの祠|ダコ・タワの祠|キョシ・オーの祠|ミィ・スゥの祠|キマ・ズースの祠|ラキュ・ウロの祠|ダヒ・シーノの祠|カツ・トサの祠|ジズ・カフィの祠|カ・ムーの祠|ケニィ・シカの祠|リター・ズモの祠|ヅナ・カイの祠|ツツア・ニマの祠|トゥ・カロの祠|モア・キシトの祠|シモ・イトセの祠|ダカ・カの祠|ショラ・ハの祠|キュ・ラムヒの祠|サ・ダージュの祠|ミーロ・ツヒの祠|グ・アチトーの祠|ケハ・ラマの祠|タ・ムールの祠|カオ・マカの祠|プマ・ニットの祠|シ・タタンケの祠|シ・クチョフの祠|ヤ・ナーガの祠|アコ・ヴァータの祠|ラノ・クヒーの祠|ティナ・キョザの祠|カ・オキョの祠|ロナ・カータの祠|ウータ・ドの祠|ヴォリダ・ノの祠|ノッキ・ミヒの祠|シャ・タワの祠|ドゥンバ・タの祠|カマ・ラヒの祠|ヒャ・ミウの祠|ト・クモの祠|シャダ・アダの祠|ガオマ・アサの祠|ラー・クアの祠|ミョス・シノの祠|シャ・ゲマの祠|リ・モナの祠|カザ・トッキの祠".split("|");
  var result = {};
  for (var i = 0; i < shrines.length; i++) {
    result[shrines[i]] = true;
  }
  return result;
})();
var shrinesToJapanese = (function () {
  var shrines = "\
カヤ・ミワの祠|Kaya Wan Shrine\r\n\
ダタ・クスの祠|Daka Tuss Shrine\r\n\
ミーズー・ヨの祠|Mezza Lo Shrine\r\n\
ルッコ・マの祠|Rucco Maag Shrine\r\n\
シ・ヨタの祠|Shai Yota Shrine\r\n\
ワゴ・カタの祠|Wahgo Katta Shrine\r\n\
ヒロ・ヒラの祠|Hila Rao Shrine\r\n\
タロ・ニヒの祠|Ta'loh Naeg Shrine\r\n\
ラーナ・ロキの祠|Lakna Rokee Shrine\r\n\
カム・ユオの祠|Kam Urog Shrine\r\n\
ダウ・ナエの祠|Dow Na'eh Shrine\r\n\
ジター・サミの祠|Jitan Sa'mi Shrine\r\n\
ターノ・アの祠|Tahno O'ah Shrine\r\n\
ヴァシ・リャコの祠|Bosh Kala Shrine\r\n\
リ・ダヒの祠|Ree Dahee Shrine\r\n\
シベ・ニャスの祠|Shee Venath Shrine\r\n\
シベ・ニーロの祠|Shee Vaneer Shrine\r\n\
ハユ・ダマの祠|Ha Dahamar Shrine\r\n\
ミャマ・ガナの祠|Myahm Agana Shrine\r\n\
シ・クチョフの祠|Shae Katha Shrine\r\n\
トト・イサの祠|Toto Sah Shrine\r\n\
ヤ・ナーガの祠|Ya Naga Shrine\r\n\
プマ・ニットの祠|Pumaag Nitae Shrine\r\n\
シ・タタンケの祠|Shoqa Tatone Shrine\r\n\
カオ・マカの祠|Ka'o Makagh Shrine\r\n\
ショダ・サーの祠|Shoda Sah Shrine\r\n\
サイ・ウートの祠|Shai Utoh Shrine\r\n\
キュカ・ナタの祠|Qukah Nata Shrine\r\n\
タワ・ジヌの祠|Tawa Jinn Shrine\r\n\
ヤオ・マーヨの祠|Yah Rin Shrine\r\n\
マ・カヤの祠|Kah Yah Shrine\r\n\
ムオ・ジームの祠|Muwo Jeem Shrine\r\n\
チャス・ケタの祠|Chaas Qeta Shrine\r\n\
クグ・チデの祠|Korgu Chideh Shrine\r\n\
キマ・コササの祠|Kema Kosassa Shrine\r\n\
キハ・ウの祠|Keeha Yoog Shrine\r\n\
クイ・タッカの祠|Kuh Takkar Shrine\r\n\
モ・ラタニアの祠|Mogg Latan Shrine\r\n\
シ・ダゴズの祠|Sheem Dagoze Shrine\r\n\
ヤカー・マタの祠|Kaam Ya'tak Shrine\r\n\
ルヨ・タウの祠|Rota Ooh Shrine\r\n\
ジュニ・シの祠|Joloo Nah Shrine\r\n\
トゥミ・ンケの祠|Keh Namut Shrine\r\n\
マ・オーヌの祠|Oman Au Shrine\r\n\
ジャ・バシフの祠|Ja Baij Shrine\r\n\
ワ・モダイの祠|Owa Daim Shrine\r\n\
ジノ・ヨーの祠|Jee Noh Shrine\r\n\
ケー・ノイの祠|Kay Noh Shrine\r\n\
ダコ・タワの祠|Dako Tah Shrine\r\n\
ササ・カイの祠|Sasa Kai Shrine\r\n\
シ・ジトの祠|Sho Dantu Shrine\r\n\
キマ・ズースの祠|Kema Zoos Shrine\r\n\
ト・カユーの祠|Tho Kayu Shrine\r\n\
ハワ・カイの祠|Hawa Koth Shrine\r\n\
グコ・チセの祠|Daqo Chisay Shrine\r\n\
ラキュ・ウロの祠|Raqa Zunzo Shrine\r\n\
キョシ・オーの祠|Korsh O'hu Shrine\r\n\
ミィ・スゥの祠|Misae Suma Shrine\r\n\
ディラ・マの祠|Dila Maag Shrine\r\n\
スマ・サマの祠|Suma Sahma Shrine\r\n\
イオ・ソオの祠|Ishto Soh Shrine\r\n\
ト・クモの祠|To Quomo Shrine\r\n\
シャダ・アダの祠|Shada Naw Shrine\r\n\
ラー・クアの祠|Rok Uwog Shrine\r\n\
カザ・トッキの祠|Qaza Tokki Shrine\r\n\
ミョス・シノの祠|Mozo Shenno Shrine\r\n\
ガオマ・アサの祠|Goma Asaagh Shrine\r\n\
カマ・ラヒの祠|Maka Rah Shrine\r\n\
シャ・タワの祠|Sha Warvo Shrine\r\n\
ラノ・クヒーの祠|Lanno Kooh Shrine\r\n\
ノッキ・ミヒの祠|Gee Ha'rah Shrine\r\n\
リ・モナの祠|Rin Oyaa Shrine\r\n\
ロナ・カータの祠|Rona Kachta Shrine\r\n\
ウータ・ドの祠|Voo Lota Shrine\r\n\
アコ・ヴァータの祠|Akh Va'quot Shrine\r\n\
ヴォリダ・ノの祠|Bareeda Naag Shrine\r\n\
ドゥンバ・タの祠|Dunba Taag Shrine\r\n\
マ・ノラの祠|Maag No'rah Shrine\r\n\
モンヤ・トマの祠|Monya Toma Shrine\r\n\
カ・オキョの祠|Kah Okeo Shrine\r\n\
ティナ・キョザの祠|Tena Ko'sah Shrine\r\n\
シャオ・ヨの祠|Shae Loya Shrine\r\n\
トー・ヤッサの祠|Toh Yahsa Shrine\r\n\
キワ・ザタスの祠|Zalta Wa Shrine\r\n\
ニア・ネアの祠|Noya Neha Shrine\r\n\
カタ・チュキの祠|Katah Chuki Shrine\r\n\
キト・ワワイの祠|Ketoh Wawai Shrine\r\n\
ショラ・ハの祠|Shora Hah Shrine\r\n\
グ・アチトーの祠|Gorae Torr Shrine\r\n\
ヅナ・カイの祠|Zuna Kai Shrine\r\n\
ダ・チョカヒの祠|Daag Chokah Shrine\r\n\
クン・シダジの祠|Kuhn Sidajj Shrine\r\n\
キヨ・ウーの祠|Keo Ruug Shrine\r\n\
マーム・ラノの祠|Maag Halan Shrine\r\n\
シモ・イトセの祠|Shae Mo'sah Shrine\r\n\
ダカ・カの祠|Daqa Koh Shrine\r\n\
ケハ・ラマの祠|Kayra Mah Shrine\r\n\
ツツア・ニマの祠|Tutsuwa Nima Shrine\r\n\
カツ・トサの祠|Katosa Aug Shrine\r\n\
リター・ズモの祠|Ritaag Zumo Shrine\r\n\
サス・コサの祠|Saas Ko'sah Shrine\r\n\
ナミカ・オズの祠|Namika Ozz Shrine\r\n\
ミーロ・ツヒの祠|Mirro Shaz Shrine\r\n\
キュ・ラムヒの祠|Qua Raym Shrine\r\n\
ネヅ・ヨマの祠|Ne'ez Yohma Shrine\r\n\
サオ・コヒの祠|Soh Kofi Shrine\r\n\
カ・ムーの祠|Kah Mael Shrine\r\n\
シェモ・ラタの祠|Sheh Rata Shrine\r\n\
ダ・キキーの祠|Dagah Keek Shrine\r\n\
ジズ・カフィの祠|Ze Kasho Shrine\r\n\
ダヒ・シーノの祠|Dah Hesho Shrine\r\n\
ケニィ・シカの祠|Ke'nai Shakah Shrine\r\n\
トゥ・カロの祠|Tu Ka'loh Shrine\r\n\
モア・キシトの祠|Mo'a Keet Shrine\r\n\
サ・ダージュの祠|Sah Dahaj Shrine\r\n\
ヒャ・ミウの祠|Hia Miu Shrine\r\n\
シャ・ゲマの祠|Sha Gehma Shrine\r\n\
ミッダ・ロキの祠|Mijah Rokee Shrine\r\n\
ダ・カソーの祠|Dah Kaso Shrine\r\n\
タ・ムールの祠|Tah Muhl Shrine\r\n\
".split("\r\n");
  var result = {};
  for (var i = 0; i < shrines.length; i++) {
    if (!shrines[i]) continue;
    var shrine = shrines[i].split("|");
    if (!result[shrine[1]]) {
      result[shrine[1]] = shrine[0];
    } else {
      console.log("same shrine in English: " + shrine[1]);
    }
  }
  return result;
})();