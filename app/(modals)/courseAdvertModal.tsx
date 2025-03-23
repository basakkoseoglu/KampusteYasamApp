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

const CourseAdvertModal = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [ownerName, setOwnerName] = useState('');
  const [schoolInfo, setSchoolInfo] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');

  // Dropdown states
  const [resourceType, setResourceType] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const resourceTypes = ['DERS NOTU', 'KİTAP', 'ÖZET', 'SUNUM & SLAYT'];

  const [conditionType, setConditionType] = useState('');
  const [conditionDropdownVisible, setConditionDropdownVisible] = useState(false);
  const conditionTypes = ['TEMİZ', 'KULLANILMIŞ'];

  const [shareType, setShareType] = useState('');
  const [shareDropdownVisible, setShareDropdownVisible] = useState(false);
  const shareTypes = ['ÜCRETSİZ', 'TAKAS', 'SATILIK', 'KİRALIK'];

  useEffect(() => {
    if (user?.name) setOwnerName(user.name);
    if (user?.university) setSchoolInfo(user.university);
  }, [user]);

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

  const handlePublish = () => {
    router.back();
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
          <Text style={styles.mainTitle}>Ders Notu & Kitap Paylaşımı</Text>
          <Text style={styles.subTitle}>
            Ders notu ve kitaplarınızı paylaşın!
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

            {/* İlan Başlığı */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.PencilSimple size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>İlan Başlığı</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Örn. Matematik 2 Ders Notları"
                placeholderTextColor="#999"
                value={courseTitle}
                onChangeText={setCourseTitle}
              />
            </View>

            {/* Ders Adı / Konu */}
            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Icons.BookOpen size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.label}>Ders Adı / Konu</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Örn. Diferansiyel Denklemler"
                placeholderTextColor="#999"
                value={courseName}
                onChangeText={setCourseName}
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
          </View>

          {/* Ek Bilgiler (Card) */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Icons.Info size={24} color="#FF9800" style={styles.headerIcon} />
              <Text style={styles.cardTitle}>Ek Bilgiler</Text>
            </View>

            {/* Resource Type Dropdown */}
            <View style={styles.optionContainer}>
              <View style={styles.labelRow}>
                <Icons.Notebook size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.optionText}>Not / Kaynak Türü</Text>
              </View>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setDropdownVisible(true)}
              >
                <Text style={styles.dropdownButtonText}>
                  {resourceType || 'Not / Kaynak Türünü Seçin'}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Condition Dropdown */}
            <View style={styles.optionContainer}>
              <View style={styles.labelRow}>
                <Icons.CheckCircle size={20} color="#555" style={styles.labelIcon} />
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

            {/* Share Type Dropdown */}
            <View style={styles.optionContainer}>
              <View style={styles.labelRow}>
                <Icons.ShareNetwork size={20} color="#555" style={styles.labelIcon} />
                <Text style={styles.optionText}>Paylaşım Şekli</Text>
              </View>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShareDropdownVisible(true)}
              >
                <Text style={styles.dropdownButtonText}>
                  {shareType || 'Paylaşım Şeklini Seçin'}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#79A57BFF',
    marginTop: 16,
    textAlign: 'center',
    marginBottom:8
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
    // Gölge
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  // Kart Başlığında İkon ve Metin Aynı Satır
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
  // Label Satırında İkon ve Metin Aynı Hizada
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
    fontWeight:'500'
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
  // Ek Bilgiler İçindeki Satırlarda da İkon + Metin Hizalaması
  optionContainer: {
    flexDirection: 'row',
     justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16
  },
  optionText: {
    fontSize: 15,
    fontWeight:'500',
    color: '#333',
    width:100,
    marginRight:12,
   
  },
  dropdownButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //kenarlarına netleştirip büyütüypr
    // borderWidth:1,
    // borderColor:'#ccc',
    width:180,
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
    flex:1,
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
    marginLeft:8,
  },
  publishButton: {
    backgroundColor: '#79A57BFF',
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

export default CourseAdvertModal;
