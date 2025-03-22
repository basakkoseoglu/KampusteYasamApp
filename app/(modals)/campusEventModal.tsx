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
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CampusEventModal = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Kullanıcı Bilgileri
  const [ownerName, setOwnerName] = useState('');
  const [schoolInfo, setSchoolInfo] = useState('');

  // İlan Bilgileri
  const [ilanBasligi, setIlanBasligi] = useState('');
  const [etkinlikAciklamasi, setEtkinlikAciklamasi] = useState('');
  const [katilimSartlari, setKatilimSartlari] = useState('');
  const [ucretBilgisi, setUcretBilgisi] = useState('');

  // Etkinlik Türü için Dropdown
  const [etkinlikTuru, setEtkinlikTuru] = useState('');
  const [etkinlikTuruVisible, setEtkinlikTuruVisible] = useState(false);
  const etkinlikTurleri = [
    'Konser',
    'Seminer',
    'Workshop',
    'Söyleşi',
    'Spor Aktivitesi',
    'Kültürel Gezi',
    'Parti',
    'Diğer'
  ];

  // Ek Bilgiler: Tarih, Saat & Konum
  const [etkinlikTarihi, setEtkinlikTarihi] = useState('');
  const [etkinlikSaati, setEtkinlikSaati] = useState('');
  const [etkinlikYeri, setEtkinlikYeri] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    if (user?.name) setOwnerName(user.name);
    if (user?.university) setSchoolInfo(user.university);
  }, [user]);

  const handleEtkinlikTuruSelect = (type: string) => {
    setEtkinlikTuru(type);
    setEtkinlikTuruVisible(false);
  };

  const handleYayinla = () => {
    // Etkinlik ilan kaydetme işlemleri burada yapılabilir
    router.back();
  };

  // DatePicker işlevleri
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate: Date) => {
    // Tarihi istenen formatta göstermek için örneğin: "20 Mart 2025"
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    const formattedDate = selectedDate.toLocaleDateString('tr-TR', options);
    setEtkinlikTarihi(formattedDate);
    hideDatePicker();
  };

  // TimePicker işlevleri
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (selectedTime: Date) => {
    // Saati istenen formatta göstermek için örneğin: "14:30"
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    const formattedTime = selectedTime.toLocaleTimeString('tr-TR', options);
    setEtkinlikSaati(formattedTime);
    hideTimePicker();
  };

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
          <Text style={styles.mainTitle}>Kampüs İçi Etkinlik&Duyurular</Text>
          <Text style={styles.subTitle}>
            Konser, seminer, workshop... Etkinliğinizi öğrenci arkadaşlarınızla paylaşın!
          </Text>

          {/* Kullanıcı Bilgileri (Card) */}
          <View style={styles.card}>
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
            {/* İlan Başlığı */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.PencilSimple size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Başlık</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Örn. Bahar Şenliği Konseri"
                placeholderTextColor="#999"
                value={ilanBasligi}
                onChangeText={setIlanBasligi}
              />
            </View>
            {/* Etkinlik Açıklaması */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.NotePencil size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Etkinlik Açıklaması</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="Etkinliğiniz hakkında detaylı bilgi verin..."
                  placeholderTextColor="#999"
                  value={etkinlikAciklamasi}
                  onChangeText={setEtkinlikAciklamasi}
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>
            {/* Katılım Şartları */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.WarningCircle size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Katılım Şartları</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <TextInput
                  style={styles.descriptionInput}
                  placeholder="Katılım için gerekli şartlar, kısıtlamalar..."
                  placeholderTextColor="#999"
                  value={katilimSartlari}
                  onChangeText={setKatilimSartlari}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>
            {/* Ücret Bilgisi */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.CurrencyCircleDollar size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Ücret Bilgisi</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Örn. Ücretsiz, 50 TL, Bağış karşılığı..."
                placeholderTextColor="#999"
                value={ucretBilgisi}
                onChangeText={setUcretBilgisi}
              />
            </View>
          </View>

          {/* Ek Bilgiler (Card) */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Icons.Info size={24} color="#FF9800" style={styles.headerIcon} />
              <Text style={styles.cardTitle}>Ek Bilgiler</Text>
            </View>
            {/* Etkinlik Türü */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.Tag size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Etkinlik Türü</Text>
              </View>
              <TouchableOpacity
                style={styles.dropdownButtonFullWidth}
                onPress={() => setEtkinlikTuruVisible(true)}
              >
                <Text style={styles.dropdownButtonTextLeft}>
                  {etkinlikTuru || 'Etkinlik Türünü Seçin'}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
            </View>
            {/* Etkinlik Tarihi - DatePicker */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.Calendar size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Etkinlik Tarihi</Text>
              </View>
              <TouchableOpacity
                style={styles.input}
                onPress={showDatePicker}
              >
                <Text style={{ color: etkinlikTarihi ? '#333' : '#999' }}>
                  {etkinlikTarihi || 'Tarih Seçin'}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                display="inline"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
                cancelTextIOS="Vazgeç"
                confirmTextIOS="Seç"
              />
            </View>
            {/* Etkinlik Saati - TimePicker */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.Clock size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Etkinlik Saati</Text>
              </View>
              <TouchableOpacity
                style={styles.input}
                onPress={showTimePicker}
              >
                <Text style={{ color: etkinlikSaati ? '#333' : '#999' }}>
                  {etkinlikSaati || 'Saat Seçin'}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
                cancelTextIOS="Vazgeç"
                confirmTextIOS="Seç"
              />
            </View>
            {/* Etkinlik Yeri */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.MapPin size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Etkinlik Yeri</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Örn. Merkez Kampüs Amfi, Konferans Salonu"
                placeholderTextColor="#999"
                value={etkinlikYeri}
                onChangeText={setEtkinlikYeri}
              />
            </View>
          </View>
        </ScrollView>

        {/* Dropdown Modalları */}
        {renderDropdownModal(
          etkinlikTuruVisible,
          etkinlikTurleri,
          handleEtkinlikTuruSelect,
          () => setEtkinlikTuruVisible(false)
        )}

        {/* Yayınla Butonu */}
        <TouchableOpacity style={styles.publishButton} onPress={handleYayinla}>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 8
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
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
  dropdownButtonFullWidth: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  dropdownButtonTextLeft: {
    fontSize: 14,
    color: colors.neutral400,
    textAlign: 'left',
    flex: 1,
    paddingLeft: 0
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8
  },
  publishButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
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
  }
});

export default CampusEventModal;