export const Messages = {
  CREATE_SUCCESS: 'Tạo thành công',
  DELETE_SUCCESS: 'Xóa thành công',
  UPDATE_SUCCESS: 'Cập nhật thành công',
  API_ERROR: 'Lỗi hệ thống. Vui lòng liên hệ với quản trị viên',
  EMPTY_DATA: 'Không có dữ liệu',
  mustBeNumber: (label: string) => `${label} Vui lòng nhập bằng số`,
  requireInput: function (target: string) {
    return `Vui lòng nhập ${target}`;
  },
  requireSelect: function (target: string) {
    return `Vui lòng nhập ${target}`;
  },
  requireUpload: function (target: string) {
    return `Vui lòng chọn file ${target}`;
  },
  INVALID_FILE_TYPE: 'Lỗi định dạng file',
};
