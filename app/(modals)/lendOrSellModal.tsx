import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/authContext';
import * as Icons from 'phosphor-react-native';
import { colors } from '@/constants/theme';

const LendOrSellModal = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Kişi Bilgileri
  const [ownerName, setOwnerName] = useState('');
  const [schoolInfo, setSchoolInfo] = useState('');

  // İlan Bilgileri
  const [itemTitle, setItemTitle] = useState('');           // Eşya Başlığı
  const [description, setDescription] = useState('');       // Açıklama
  const [specialConditions, setSpecialConditions] = useState(''); // Özel Şartlar
  const [price, setPrice] = useState('');                   // Fiyat
  const [rentalPeriod, setRentalPeriod] = useState('');     // Kiralama Süresi

  // Dropdown states
  const [resourceType, setResourceType] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const resourceTypes = [
    'ELEKTRONİK',
    'EV & YAŞAM',
    'MOBİLYA & DEKORASYON',
    'KIRTASİYE & OFİS MALZEMELERİ',
    'SPOR & OUTDOOR',
    'KIYAFET & AKSESUAR',
    'OYUN & HOBİ',
    'MÜZİK ALETLERİ',
    'DİĞER'
  ];

  const [conditionType, setConditionType] = useState('');
  const [conditionDropdownVisible, setConditionDropdownVisible] = useState(false);
  const conditionTypes = ['YENİ', 'AZ KULLANILMIŞ', 'ESKİ', 'ARIZALI'];

  const [shareType, setShareType] = useState('');
  const [shareDropdownVisible, setShareDropdownVisible] = useState(false);
  const shareTypes = ['EVET', 'HAYIR'];

  // Kullanıcı verilerini çek
  useEffect(() => {
    if (user?.name) setOwnerName(user.name);
    if (user?.university) setSchoolInfo(user.university);
  }, [user]);

  // Dropdown seçimleri
  const handleResourceTypeSelect = (type: string) => {
    setResourceType(type);
    setDropdownVisible(false);
  };

  const handleConditionTypeSelect = (type: string) => {
    setConditionType(type);
    setConditionDropdownVisible(false);
  };

  const handleShareTypeSelect = (type: string) => {
    setShareType(type);
    setShareDropdownVisible(false);
  };

  // İlanı Yayınla (şimdilik sadece geri dönüyor)
  const handlePublish = () => {
    router.back();
  };

  // Tek bir modal renderer fonksiyonu
  const renderDropdownModal = (
    visible: boolean,
    items: string[],
    onSelect: (item: string) => void,
    onClose: () => void
  ) => (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.dropdownMenu}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScreenWrapper style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Ana Başlık */}
          <Text style={styles.mainTitle}>
            Ödünç Eşya Verme  & {"\n"} Kullanılmayan Eşya Satma
          </Text>
          <Text style={styles.subTitle}>
            Ödünç ver, sat!
          </Text>

          {/* Kişi Bilgileri (Card) */}
          <View style={styles.card}>
            {/* Kart Başlığı */}
            <View style={styles.cardHeaderRow}>
              <Icons.User size={24} color="#FF9800" style={styles.headerIcon} />
              <Text style={styles.cardTitle}>Kişi Bilgileri</Text>
            </View>

            {/* İsim */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.UserCircle size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>İsim</Text>
              </View>
              <TextInput
                style={styles.input}
                value={ownerName}
                editable={false}
              />
            </View>

            {/* Üniversite */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.Building size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Üniversite</Text>
              </View>
              <TextInput
                style={styles.input}
                value={schoolInfo}
                editable={false}
              />
            </View>
          </View>

          {/* İlan Bilgileri (Card) */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Icons.FileText size={24} color="#FF9800" style={styles.headerIcon} />
              <Text style={styles.cardTitle}>İlan Bilgileri</Text>
            </View>

            {/* Eşya Başlığı */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.Article size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Eşya Başlığı</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Örn. İkinci El Laptop Satılık"
                placeholderTextColor="#999"
                value={itemTitle}
                onChangeText={setItemTitle}
              />
            </View>

            {/* Açıklama */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.NotePencil size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Açıklama</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="İlan ile ilgili detayları buraya yazabilirsiniz..."
                  placeholderTextColor="#999"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>

            {/* Özel Şartlar */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.WarningCircle size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Özel Şartlar</Text>
              </View>
              <TextInput
                style={styles.specialInput}
                placeholder="Örn. Hasar durumunda sorumluluk kabul etmiyorum."
                placeholderTextColor="#999"
                value={specialConditions}
                multiline
                numberOfLines={2}
                onChangeText={setSpecialConditions}
              />
            </View>

            {/* Fiyat */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.CurrencyDollar size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Fiyat</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Örn. 200 (TL)"
                placeholderTextColor="#999"
                value={price}
                onChangeText={setPrice}
              />
            </View>

            {/* Kiralama Süresi */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.Timer size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Kiralama Süresi</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Örn. 30 gün"
                placeholderTextColor="#999"
                value={rentalPeriod}
                onChangeText={setRentalPeriod}
              />
            </View>
          </View>

          {/* Ek Bilgiler (Card) */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Icons.Info size={24} color="#FF9800" style={styles.headerIcon} />
              <Text style={styles.cardTitle}>Ek Bilgiler</Text>
            </View>

            {/* Eşya Türü (Dropdown) */}
            <View style={styles.optionContainer}>
              <View style={styles.labelRow}>
                <Icons.Tag size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.optionText}>Eşya Türü</Text>
              </View>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setDropdownVisible(true)}
              >
                <Text style={styles.dropdownButtonText}>
                  {resourceType || 'Eşya Türünü Seçin'}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Durumu (Dropdown) */}
            <View style={styles.optionContainer}>
              <View style={styles.labelRow}>
                <Icons.WarningCircle size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.optionText}>Durumu</Text>
              </View>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setConditionDropdownVisible(true)}
              >
                <Text style={styles.dropdownButtonText}>
                  {conditionType || 'Durum Seçin'}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Depozite (Dropdown) */}
            <View style={styles.optionContainer}>
              <View style={styles.labelRow}>
                <Icons.Bank size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.optionText}>Depozite</Text>
              </View>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShareDropdownVisible(true)}
              >
                <Text style={styles.dropdownButtonText}>
                  {shareType || 'Depozite Şeklini Seçin'}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Dropdown Modalları */}
        {renderDropdownModal(
          dropdownVisible,
          resourceTypes,
          handleResourceTypeSelect,
          () => setDropdownVisible(false)
        )}
        {renderDropdownModal(
          conditionDropdownVisible,
          conditionTypes,
          handleConditionTypeSelect,
          () => setConditionDropdownVisible(false)
        )}
        {renderDropdownModal(
          shareDropdownVisible,
          shareTypes,
          handleShareTypeSelect,
          () => setShareDropdownVisible(false)
        )}

        {/* Yayınla Butonu */}
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Yayınla</Text>
        </TouchableOpacity>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollView: {
    flex: 1
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom:8
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16
  },
  titleContainer:{
    width:'100%',
    alignItems:'center',
    paddingVertical:10,
      
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    // Gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  headerIcon: {
    marginRight: 8
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF9800'
  },
  inputWrapper: {
    marginBottom: 12
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  labelIcon: {
    marginRight: 6
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    // Gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    // Gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  descriptionInput: {
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    width: 100,
    marginRight: 12
  },
  dropdownButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 180,
    // Gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  dropdownButtonText: {
    fontSize: 14,
    color: colors.neutral400,
    flex: 1
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8
  },
  publishButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    margin: 16
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '80%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333'
  },
  specialInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    // Gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    // Çok satırlı yapı için minimum yüksekliği biraz artırıyoruz
    minHeight: 80,
    textAlignVertical: 'top'
  },
});

export default LendOrSellModal;
