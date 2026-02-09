import frappe
from frappe import _

@frappe.whitelist()
def create_task_queue(task_type, payload):
    """
    API Chung để khởi tạo một tác vụ ngầm.
    :param task_type: IMPORT_JOB, EXPORT_JOB, hoặc EXPORT_REPORT
    :param payload: Dict chứa tham số (ví dụ filters hoặc file_url)
    """
    # 1. Khởi tạo bản ghi trong DocType Task Queue
    task = frappe.get_doc({
        "doctype": "JDStore Task Queue",
        "task_type": task_type,
        "status": "QUEUED",
        "payload": frappe.as_json(payload),
        "created_by": frappe.session.user
    })
    task.insert(ignore_permissions=True)
    
    # 2. Đẩy vào Worker xử lý ngầm 
    # Hàm xử lý thực tế sẽ được định nghĩa tùy theo task_type
    frappe.enqueue(
        'jdstore.tasks.import_export.execute_task',
        task_id=task.name,
        queue='long', # Dùng hàng chờ dài cho các tác vụ nặng
        timeout=3600
    )
    
    return {
        "status": "success",
        "task_id": task.name,
        "message": _("Tác vụ đã được đưa vào hàng chờ xử lý.")
    }