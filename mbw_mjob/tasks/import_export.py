import frappe
def execute_task(task_id):
    task = frappe.get_doc("JDStore Task Queue", task_id)
    task.db_set("status", "PROCESSING")
    task.db_set("started_at", frappe.utils.now_datetime())
    
    try:
        payload = frappe.parse_json(task.payload)
        
        if task.task_type == "IMPORT_JOB":
            # Gọi logic xử lý Import của module Job Raw
            from jdstore.modules.job_raw import process_import
            process_import(task, payload)
            
        elif task.task_type == "EXPORT_JOB":
            # Gọi logic xử lý Export của module Job Posting
            from jdstore.modules.job_posting import process_export
            process_export(task, payload)
            
        task.db_set("status", "COMPLETED")
        task.db_set("progress", 100)
        
    except Exception as e:
        task.db_set("status", "FAILED")
        task.db_set("error_log", frappe.get_traceback())
    finally:
        task.db_set("completed_at", frappe.utils.now_datetime())
        # Bắn socket báo cho FE biết tác vụ đã xong
        frappe.publish_realtime('task_progress', {"task_id": task_id, "status": task.status})